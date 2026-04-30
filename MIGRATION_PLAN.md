# AI SaaS Platform - Aşamalı Geçiş Planı

## 📊 Mevcut Durum (Güncel)
- ✅ Frontend: Tamamen hazır (React + TypeScript + Vite)
- ✅ simple_main.py: Mock verilerle çalışıyor (Port 8000)
- ✅ migration_main.py: Hazır (MongoDB optional)
- ⚠️ main.py: Tüm özellikler var ama dependency kontrolü gerekli
- ❌ MongoDB: Henüz bağlı değil (local kurulum gerekli)
- ❌ Supabase: Henüz bağlı değil (API keys gerekli)
- ✅ Tüm model dosyaları: Hazır (40+ image, 43 video, 21 effect, 5 package)
- ✅ Provider reference: Hazır ve güncel

## 🎯 Geçiş Stratejisi

### PHASE 1: Temel Altyapı (ŞU AN BURADAYIZ) ⏳
**Hedef**: Database bağlantısı ve authentication

1. **Database Kurulumu** (Öncelik: YÜKSEK)
   - [ ] MongoDB local kurulum (Docker veya standalone)
   - [ ] MongoDB connection test (core/database.py)
   - [ ] Temel collections oluştur (scripts/setup_database.py)
   - [ ] Test data seed (scripts/seed_database.py)
   - [ ] Supabase hesap aç ve API keys al (opsiyonel)

2. **Authentication Sistemi** (Öncelik: YÜKSEK)
   - [ ] JWT token sistemi aktif et (core/security.py)
   - [ ] User registration endpoint (routes/auth.py)
   - [ ] User login endpoint (routes/auth.py)
   - [ ] Frontend auth integration test
   - [ ] Token refresh mechanism

3. **Credit System** (Öncelik: ORTA)
   - [ ] User credits collection
   - [ ] Credit deduction logic (core/credits.py)
   - [ ] Transaction logging
   - [ ] Frontend credit display

### PHASE 2: AI Provider Entegrasyonları (SONRA) 🔮
**Hedef**: Gerçek AI provider'ları bağla

1. **Image Generation** (Öncelik: YÜKSEK)
   - [ ] Fal.ai API key al ve test et
   - [ ] Fal.ai integration (services/image_service.py)
   - [ ] Replicate API key al ve test et
   - [ ] Replicate integration (services/image_service.py)
   - [ ] 40+ model test (core/image_models.py kullan)
   - [ ] Frontend'den test generation

2. **Video Generation** (Öncelik: ORTA)
   - [ ] Pollo.ai API key al
   - [ ] Pollo.ai integration (services/video_service.py)
   - [ ] 43 model test (core/pollo_models.py kullan)
   - [ ] 21 effect test
   - [ ] 5 package test
   - [ ] Frontend'den test generation

3. **Audio Generation** (Öncelik: DÜŞÜK)
   - [ ] ElevenLabs API key al
   - [ ] ElevenLabs TTS integration
   - [ ] Google TTS API key al
   - [ ] Google TTS integration
   - [ ] Voice cloning test

### PHASE 3: Advanced Features (EN SON) 🚀
**Hedef**: Production-ready özellikler

1. **Payment System** (Öncelik: YÜKSEK)
   - [ ] LemonSqueezy integration (credit card)
   - [ ] NOWPayments integration (crypto)
   - [ ] Binance Pay integration
   - [ ] MetaMask integration (15% discount)
   - [ ] Package system (Starter/Pro/Enterprise)
   - [ ] Invoice generation

2. **File Management** (Öncelik: ORTA)
   - [ ] AWS S3 veya Cloudflare R2 setup
   - [ ] File upload system (routes/files.py)
   - [ ] Media library (routes/media.py)
   - [ ] 2-month retention policy
   - [ ] Showcase feature

3. **Admin Panel** (Öncelik: DÜŞÜK)
   - [ ] User management
   - [ ] Credit management
   - [ ] Service cost configuration
   - [ ] Platform analytics

4. **Monitoring & Security** (Öncelik: ORTA)
   - [ ] Sentry error tracking
   - [ ] Rate limiting (slowapi)
   - [ ] Logging (loguru)
   - [ ] Prometheus metrics

## 📁 Kritik Dosyalar (Mevcut ve Hazır)

### Core Modules
- ✅ `core/config.py` - Environment variables ve ayarlar
- ✅ `core/database.py` - MongoDB async connection
- ✅ `core/supabase_client.py` - Supabase client
- ✅ `core/security.py` - JWT, password hashing
- ✅ `core/credits.py` - Credit management
- ✅ `core/logger.py` - Structured logging
- ✅ `core/rate_limiter.py` - DoS protection

### Model Definitions
- ✅ `core/image_models.py` - 40+ image models (Fal.ai + Replicate)
- ✅ `core/pollo_models.py` - 43 video models + 21 effects + 5 packages
- ✅ `core/audio_models.py` - ElevenLabs + Google TTS models
- ✅ `core/pricing_config.py` - Dynamic pricing system

### Services
- ✅ `services/auth_service.py` - Authentication logic
- ✅ `services/image_service.py` - Image generation orchestration
- ✅ `services/video_service.py` - Video generation orchestration
- ✅ `services/audio_service.py` - Audio generation orchestration
- ✅ `services/pricing_service.py` - Pricing calculations

### Routes (API Endpoints)
- ✅ `routes/auth.py` - Login, register, OAuth
- ✅ `routes/image_new.py` - Image generation endpoints
- ✅ `routes/video_new.py` - Video generation endpoints
- ✅ `routes/audio_extended.py` - Audio generation endpoints
- ✅ `routes/user.py` - User profile, API keys
- ✅ `routes/billing.py` - Payments, packages
- ✅ `routes/media.py` - Media library
- ✅ `routes/admin.py` - Admin panel

### Scripts
- ✅ `scripts/setup_database.py` - Database initialization
- ✅ `scripts/seed_database.py` - Test data seeding
- ✅ `scripts/validate_config.py` - Config validation
- ✅ `scripts/test_auth.py` - Auth testing

## Provider Detayları
### Image Providers
- **Fal.ai**: 25+ models (FLUX, SDXL, etc.)
- **Replicate**: 15+ models (Midjourney style)

### Video Providers  
- **Pollo.ai**: 43 models, 21 effects, 5 packages

### Audio Providers
- **ElevenLabs**: Premium TTS, voice cloning
- **Google TTS**: Standard TTS

## 🔄 Geçiş Adımları (Detaylı)

### Adım 1: MongoDB Kurulumu (ŞİMDİ)
```bash
# Option A: Docker ile (Önerilen)
cd ai-saas-production
docker-compose up -d mongodb

# Option B: Standalone MongoDB
# Windows: MongoDB Community Edition indir ve kur
# https://www.mongodb.com/try/download/community
```

### Adım 2: Database Test
```bash
cd ai-saas-production/backend
python scripts/setup_database.py
python scripts/seed_database.py
```

### Adım 3: Migration Main Çalıştır
```bash
cd ai-saas-production/backend
python migration_main.py
# Test: http://localhost:8000/health
```

### Adım 4: Authentication Ekle
```bash
# .env dosyasını düzenle
JWT_SECRET_KEY=your-secret-key-min-32-chars

# Auth endpoints test et
python scripts/test_auth.py
```

### Adım 5: AI Provider Keys Ekle (Tek Tek)
```bash
# .env dosyasına ekle
FAL_API_KEY=your-fal-key
REPLICATE_API_KEY=your-replicate-key
POLLO_API_KEY=your-pollo-key
ELEVENLABS_API_KEY=your-elevenlabs-key
```

### Adım 6: Full Main'e Geçiş
```bash
# Tüm dependency'ler hazır olunca
python main.py
```

## ⚠️ Risk Azaltma
- ✅ Her adımda backup al (git commit)
- ✅ Aşamalı test et (her endpoint'i tek tek)
- ✅ Frontend değiştirme (API URL aynı kalacak)
- ✅ Mock data koru (fallback için migration_main.py)
- ✅ Error logging aktif (logs/ klasörü)
- ✅ Health check endpoint kullan (/health)

## 🎯 Bir Sonraki Adım
**ŞİMDİ YAPILACAK**: MongoDB kurulumu ve test
1. MongoDB'yi Docker ile başlat VEYA standalone kur
2. `python scripts/setup_database.py` çalıştır
3. `python migration_main.py` ile test et
4. Frontend'i migration_main.py'ye bağla
5. Authentication ekle