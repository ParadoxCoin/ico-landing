export const config = {
  runtime: 'edge',
};

const ZEX_TOKEN_ADDRESS = '0x28De651aCA0f8584FA2E072cE7c1F4EE774a8B4a' as const;
const ZEX_PRICE_USD = 0.009;
const POLYGON_CHAIN_ID = 137;
const POLYGON_RPC = 'https://polygon-rpc.com';

// ERC20 transfer ABI
const ERC20_ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const receivedSignature = req.headers.get('x-nowpayments-sig');
    const IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET;

    // Verify HMAC signature
    if (IPN_SECRET && receivedSignature) {
      const sortedBody = sortObject(body);
      const bodyString = JSON.stringify(sortedBody);
      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey('raw', encoder.encode(IPN_SECRET), { name: 'HMAC', hash: 'SHA-512' }, false, ['sign']);
      const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(bodyString));
      const computedSig = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
      if (computedSig !== receivedSignature) {
        console.error('[IPN] Signature mismatch!');
        return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
      }
    }

    const { payment_id, payment_status, price_amount, price_currency, pay_amount, pay_currency, order_id, actually_paid } = body;
    console.log(`[IPN] Payment ${payment_id} | Status: ${payment_status} | Order: ${order_id}`);

    const isCompleted = payment_status === 'finished' || payment_status === 'confirmed';
    let txHash = '';
    let transferError = '';

    // Auto-distribute ZEX when payment is completed
    if (isCompleted && order_id) {
      const buyerWallet = extractWallet(order_id);
      if (buyerWallet) {
        const zexAmount = Math.floor(Number(price_amount) / ZEX_PRICE_USD);
        console.log(`[IPN] Distributing ${zexAmount} ZEX to ${buyerWallet}`);
        try {
          txHash = await sendZexTokens(buyerWallet, zexAmount);
          console.log(`[IPN] TX: ${txHash}`);
        } catch (err: any) {
          transferError = err.message || 'Transfer failed';
          console.error('[IPN] Transfer error:', transferError);
        }
      } else {
        transferError = 'No wallet found in order_id';
      }
    }

    // Admin email
    await notifyAdmin(body, isCompleted, txHash, transferError);

    return new Response(JSON.stringify({ success: true, status: payment_status, txHash }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[IPN] Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

// Extract wallet from: ZEX-0xABCD...-1234567890
function extractWallet(orderId: string): string | null {
  const m = orderId.match(/ZEX-(0x[a-fA-F0-9]{40})-/);
  return m ? m[1] : null;
}

/**
 * Send ZEX tokens using viem (Edge-compatible)
 */
async function sendZexTokens(to: string, amount: number): Promise<string> {
  const pk = process.env.ZEX_DISTRIBUTOR_PRIVATE_KEY;
  if (!pk) throw new Error('ZEX_DISTRIBUTOR_PRIVATE_KEY not set');

  const { createWalletClient, createPublicClient, http, parseUnits } = await import('viem');
  const { privateKeyToAccount } = await import('viem/accounts');
  const { polygon } = await import('viem/chains');

  const account = privateKeyToAccount(`0x${pk.replace(/^0x/, '')}` as `0x${string}`);

  const publicClient = createPublicClient({
    chain: polygon,
    transport: http(POLYGON_RPC),
  });

  const walletClient = createWalletClient({
    account,
    chain: polygon,
    transport: http(POLYGON_RPC),
  });

  // Use writeContract for clean ERC20 transfer
  const hash = await walletClient.writeContract({
    address: ZEX_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'transfer',
    args: [to as `0x${string}`, parseUnits(amount.toString(), 18)],
    gas: BigInt(100000),
    chain: polygon,
  });

  // Wait for confirmation (up to 30s)
  try {
    await publicClient.waitForTransactionReceipt({ hash, timeout: 30_000 });
  } catch {
    // TX submitted but not confirmed yet — still OK
  }

  return hash;
}

async function notifyAdmin(body: any, isCompleted: boolean, txHash: string, transferError: string) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) return;

  const { payment_id, payment_status, price_amount, price_currency, pay_amount, pay_currency, order_id, actually_paid } = body;
  const wallet = extractWallet(order_id || '');
  const zex = Math.floor(Number(price_amount) / ZEX_PRICE_USD);
  const emoji = isCompleted ? (txHash ? '✅' : '⚠️') : '⏳';

  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || 'info@zexai.io',
      to: process.env.ADMIN_EMAIL || 'info@zexai.io',
      subject: `${emoji} ZEX Presale ${payment_status}: $${price_amount} (${pay_currency})`,
      html: `
        <h2>${emoji} Payment ${payment_status}</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:bold">Payment ID</td><td style="padding:6px;border:1px solid #ddd">${payment_id}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:bold">Amount</td><td style="padding:6px;border:1px solid #ddd">$${price_amount} ${price_currency}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:bold">Paid</td><td style="padding:6px;border:1px solid #ddd">${actually_paid || pay_amount} ${pay_currency}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:bold">Buyer</td><td style="padding:6px;border:1px solid #ddd;font-family:monospace;font-size:12px">${wallet || 'N/A'}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd;font-weight:bold;color:#059669">ZEX</td><td style="padding:6px;border:1px solid #ddd;font-weight:bold;color:#059669">${zex.toLocaleString()} ZEX</td></tr>
          ${txHash ? `<tr><td style="padding:6px;border:1px solid #ddd;font-weight:bold">TX</td><td style="padding:6px;border:1px solid #ddd"><a href="https://polygonscan.com/tx/${txHash}">${txHash.slice(0, 20)}...</a></td></tr>` : ''}
          ${transferError ? `<tr><td style="padding:6px;border:1px solid #ddd;color:red;font-weight:bold">Error</td><td style="padding:6px;border:1px solid #ddd;color:red">${transferError}</td></tr>` : ''}
        </table>
        ${txHash ? '<p style="color:green;font-weight:bold">✅ ZEX auto-distributed!</p>' : ''}
        ${transferError ? '<p style="color:red;font-weight:bold">⚠️ Auto-transfer FAILED — manual transfer needed!</p>' : ''}
      `,
    }),
  }).catch(console.error);
}

function sortObject(obj: any): any {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(sortObject);
  return Object.keys(obj).sort().reduce((s: any, k) => { s[k] = sortObject(obj[k]); return s; }, {});
}
