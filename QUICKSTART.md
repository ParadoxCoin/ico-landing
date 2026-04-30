# 🚀 Hızlı Başlangıç Rehberi

## 📋 Mevcut Durum

✅ **Hazır Olanlar:**
- Frontend (React + TypeScript) - Tamamen çalışıyor
- Backend (FastAPI + MongoDB) - Kodlar hazır
- Mock Backend (simple_main.py) - Test için çalışıyor
- Progressive Backend (progressive_main.py) - Adım adım entegrasyon

## 🎯 3 Farklı Başlatma Modu

### 1️⃣ Mock Backend (Test İçin)
```bash
START_BACKEND.bat
```
- Tüm özellikler mock
- Database gerekmez
- Hızlı frontend testi için

### 2️⃣ Progressive Backend (Önerilen)
```bash
START_PROGRESSIVE.bat
```
- Adım adım gerçek özellikleri aktif et
- `.env.progressive` dosyasından kontrol
- Güvenli entegrasyon

### 3️⃣ Full Backend (Production)
```bash
START_FULL_BACKEND.bat
```
- Tüm özellikler gerçek
- Production-ready
- Tüm API'ler aktif

---

## 🔧 Progressive Backend Kullanımı

### Adım 1: Mock Modda Başla (Varsayılan)
`.env.progressive` dosyasında:
```bash
ENABLE_REAL_AUTH=false
ENABLE_REAL_DATABASE=false
ENABLE_REAL_IMAGE_GEN=false
ENABLE_REAL_VIDEO_GEN=false
ENABLE_REAL_AUDIO_GEN=false
```

**Test:**
1. `START_PROGRESSIVE.bat` çalıştır
2. Frontend başlat: `cd ai-saas-production\backend\frontend && npm run dev`
3. http://localhost:5173 aç
4. Login: `demo@example.com` / `demo123`

### Adım 2: Auth + Database Aktif Et
`.env.progressive` dosyasında:
```bash
ENABLE_REAL_AUTH=true
ENABLE_REAL_DATABASE=true
```

**Test:**
1. Backend'i yeniden başlat
2. Yeni kullanıcı kaydet
3. MongoDB'de kullanıcıyı kontrol et
4. Login yap

### Adım 3: Image Generation Aktif Et
`.env.progressive` dosyasında:
```bash
ENABLE_REAL_IMAGE_GEN=true
```

**Test:**
1. Backend'i yeniden başlat
2. Image sayfasına git
3. Prompt gir: "a beautiful sunset"
4. Model seç: FLUX Schnell (en ucuz)
5. Generate'e bas
6. Sonucu bekle

### Adım 4: Video Generation Aktif Et
```bash
ENABLE_REAL_VIDEO_GEN=true
```

### Adım 5: Audio Generation Aktif Et
```bash
ENABLE_REAL_AUDIO_GEN=true
```

---

## 📁 Dosya Yapısı

```
AİSaasManus/
├── START_BACKEND.bat              # Mock backend
├── START_PROGRESSIVE.bat          # Progressive backend
├── START_FULL_BACKEND.bat         # Full backend
├── INTEGRATION_PLAN.md            # Detaylı entegrasyon planı
├── QUICKSTART.md                  # Bu dosya
│
└── ai-saas-production/
    └── backend/
        ├── simple_main.py         # Mock backend
        ├── progressive_main.py    # Progressive backend
        ├── main.py                # Full backend
        ├── .env                   # Full backend config
        ├── .env.progressive       # Progressive config
        │
        └── frontend/
            ├── src/
            └── package.json
```

---

## 🐛 Sorun Giderme

### Backend başlamıyor
```bash
# Python yüklü mü?
python --version

# Gerekli paketler yüklü mü?
cd ai-saas-production\backend
pip install fastapi uvicorn python-dotenv motor pydantic
```

### Frontend başlamıyor
```bash
# Node.js yüklü mü?
node --version

# Paketler yüklü mü?
cd ai-saas-production\backend\frontend
npm install
```

### MongoDB bağlanamıyor
- `.env.progressive` dosyasında `MONGODB_URL` kontrol et
- MongoDB Atlas'ta IP whitelist kontrol et
- `ENABLE_REAL_DATABASE=false` yap (mock mode)

### API key hataları
- `.env.progressive` dosyasında API key'leri kontrol et
- İlgili özelliği `false` yap (mock mode)

---

## ✅ Test Checklist

### Mock Mode
- [ ] Backend başladı (http://localhost:8000)
- [ ] Frontend başladı (http://localhost:5173)
- [ ] Login çalışıyor
- [ ] Dashboard görünüyor
- [ ] Tüm sayfalar açılıyor

### Real Auth Mode
- [ ] Yeni kullanıcı kaydı çalışıyor
- [ ] MongoDB'de kullanıcı görünüyor
- [ ] Login JWT token dönüyor
- [ ] Kredi sistemi çalışıyor

### Real Image Gen Mode
- [ ] Model listesi geliyor
- [ ] Generate butonu çalışıyor
- [ ] Görsel üretiliyor
- [ ] Kredi düşüyor
- [ ] Sonuç kaydediliyor

---

## 📞 Yardım

Sorun mu yaşıyorsun?
1. `INTEGRATION_PLAN.md` dosyasını oku
2. Backend loglarını kontrol et
3. Browser console'u kontrol et
4. `.env.progressive` ayarlarını kontrol et

---

## 🎯 Sonraki Adımlar

1. ✅ Mock mode'da tüm sayfaları test et
2. ✅ Real auth'u aktif et ve test et
3. ✅ Image generation'ı aktif et
4. ✅ Video generation'ı aktif et
5. ✅ Audio generation'ı aktif et
6. ✅ Billing sistemini entegre et
7. ✅ Admin paneli test et

**Başarılar! 🚀**
