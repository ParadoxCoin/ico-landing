// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface AggregatorV3Interface {
  function decimals() external view returns (uint8);
  function description() external view returns (string memory);
  function version() external view returns (uint256);
  function getRoundData(
    uint80 _roundId
  ) external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
  function latestRoundData()
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
}

contract ZexPresale is Ownable, ReentrancyGuard {
    IERC20 public zexToken;
    IERC20 public usdtToken;
    IERC20 public usdcToken;
    
    AggregatorV3Interface public priceFeedTestnet;

    // Fiyatlandırma (1000 üzerinden $0.009 = 9)
    uint256 public constant PHASE_1_PRICE_USD = 9; 
    uint256 public constant PHASE_2_PRICE_USD = 14; 

    // Toplam Limitler (1 Milyar Arz: %3 = 30M, %32 = 320M)
    uint256 public constant PHASE_1_CAP = 30_000_000 * 10**18;
    uint256 public constant TOTAL_PRESALE_CAP = 350_000_000 * 10**18; 
    
    uint256 public totalTokensSold;
    bool public presaleActive = true;

    // Polygon Agi Icin Varsayilan Adresler (Farkli agda degistirilebilir)
    constructor() Ownable(msg.sender) {
        zexToken = IERC20(0x28De651aCA0f8584FA2E072cE7c1F4EE774a8B4a);
        usdtToken = IERC20(0xc2132D05D31c914a87C6611C10748AEb04B58e8F);
        usdcToken = IERC20(0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359);
        priceFeedTestnet = AggregatorV3Interface(0xAB594600376Ec9fD91F8e885dADF0CE036862dE0);
    }

    // Guncel Fiyat Faz Kontrolu (9 veya 14 döner)
    function getCurrentPrice() public view returns (uint256) {
        if (totalTokensSold < PHASE_1_CAP) {
            return PHASE_1_PRICE_USD; // $0.009
        } else {
            return PHASE_2_PRICE_USD; // $0.014
        }
    }

    // 1. NATIVE POL (MATIC) ILE ALIM
    function getLatestPolPrice() public view returns (uint256) {
        (
            , 
            int price,
            ,
            ,
            
        ) = priceFeedTestnet.latestRoundData();
        require(price > 0, "Invalid Oracle Price");
        return uint256(price); // Dolar karsiligi (8 digit)
    }

    function buyWithPol() public payable nonReentrant {
        require(presaleActive, "Presale is paused or ended");
        require(msg.value > 0, "Send POL to buy tokens");

        uint256 polPriceUsd = getLatestPolPrice(); 
        uint256 totalUsdValue = (msg.value * polPriceUsd) / 10**18; // 8 dec
        uint256 currentPrice = getCurrentPrice();

        // 8 dec - 3 dec = 10**5
        uint256 tokensToBuy = (totalUsdValue * 10**18) / (currentPrice * 10**5);
        _processPurchase(tokensToBuy);
    }

    // 2. USDT (Polygon uzerinde 6 Decimals kullanir) ILE ALIM
    function buyWithUSDT(uint256 usdtAmount) public nonReentrant {
        require(presaleActive, "Presale is paused");
        require(usdtAmount > 0, "Amount must be > 0");

        // USDT'yi yatirimcidan kontrata transfer et
        bool transferSuccess = usdtToken.transferFrom(msg.sender, address(this), usdtAmount);
        require(transferSuccess, "USDT Transfer Failed");

        uint256 currentPrice = getCurrentPrice();
        // usdtAmount (6 dec) * 10**12 = 18 dec standardı. 
        // / currentPrice (3 dec) -> * 1000
        uint256 tokensToBuy = (usdtAmount * 10**12 * 1000) / currentPrice;
        _processPurchase(tokensToBuy);
    }

    // 3. USDC (Polygon uzerinde 6 Decimals kullanir) ILE ALIM
    function buyWithUSDC(uint256 usdcAmount) public nonReentrant {
        require(presaleActive, "Presale is paused");
        require(usdcAmount > 0, "Amount must be > 0");

        // USDC'yi yatirimcidan kontrata transfer et
        bool transferSuccess = usdcToken.transferFrom(msg.sender, address(this), usdcAmount);
        require(transferSuccess, "USDC Transfer Failed");

        uint256 currentPrice = getCurrentPrice();
        uint256 tokensToBuy = (usdcAmount * 10**12 * 1000) / currentPrice;
        _processPurchase(tokensToBuy);
    }

    // Dahili Satin Alma Isleme 
    function _processPurchase(uint256 tokensToBuy) internal {
        require(totalTokensSold + tokensToBuy <= TOTAL_PRESALE_CAP, "Presale Cap Exceeded");
        require(zexToken.balanceOf(address(this)) >= tokensToBuy, "Not enough ZEX in contract");

        totalTokensSold += tokensToBuy;
        bool success = zexToken.transfer(msg.sender, tokensToBuy);
        require(success, "ZEX Token Transfer Failed");
    }

    // --- YONETICISI FONKSIYONLARI (WITHDRAW) ---

    // Biriken POL'u cek 
    function withdrawPol() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No POL to withdraw");
        (bool success, ) = owner().call{value: balance}("");
        require(success, "POL Withdrawal Failed");
    }

    // Biriken ERC20 Tokenlari (USDT, USDC) cek
    function withdrawToken(address _tokenAddress) external onlyOwner {
        IERC20 token = IERC20(_tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        bool success = token.transfer(owner(), balance);
        require(success, "Token Withdrawal Failed");
    }

    // Kalan / Satilamayan ZEX leri cek
    function withdrawUnsoldZex() external onlyOwner {
        uint256 balance = zexToken.balanceOf(address(this));
        require(balance > 0, "No ZEX left");
        bool success = zexToken.transfer(owner(), balance);
        require(success, "ZEX Withdrawal Failed");
    }

    function setPresaleActive(bool _status) external onlyOwner {
        presaleActive = _status;
    }

    receive() external payable {
        buyWithPol();
    }
}
