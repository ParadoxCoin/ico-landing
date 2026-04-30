# 🚀 Backend Entegrasyon Planı

## Mevcut Durum
- ✅ Frontend tamamen hazır (React + TypeScript)
- ✅ simple_main.py ile mock backend çalışıyor
- ✅ Tüm sayfalar ve componentler hazır
- ✅ main.py ile gerçek backend hazır (MongoDB + AI providers)
- ⚠️ İki sistem henüz entegre değil

## Hedef
Mock backend'den gerçek backend'e adım adım geçiş yapmak.

---

## 📋 Faz 1: Temel Altyapı (1-2 saat)

### 1.1 Database Bağlantısı
**Dosya:** `backend/core/database.py`
**Durum:** ✅ Hazır
**Test:**
```bash
cd backend
python scripts/setup_database.py
```

### 1.2 Authentication Sistemi
**Dosyalar:**
- `backend/routes/auth.py` ✅ Hazır
- `backend/core/security.py` ✅ Hazır
- `frontend/src/services/api.ts` ✅ Hazır

**Yapılacak:**
1. simple_main.py'deki mock auth'u gerçek auth ile değiştir
2. JWT token sistemi aktif et
3. Frontend'de token storage test et

**Test Endpoint'leri:**
- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`
- GET `/api/v1/auth/me`

---

## 📋 Faz 2: Kredi Sistemi (1 saat)

### 2.1 Kredi Yönetimi
**Dosya:** `backend/core/credits.py`
**Durum:** ✅ Hazır

**Yapılacak:**
1. Kullanıcı kaydında başlangıç kredisi (100)
2. Kredi sorgulama endpoint'i
3. Kredi düşme/artma işlemleri

**Test Endpoint'leri:**
- GET `/api/v1/user/credits`
- GET `/api/v1/user/transactions`

---

## 📋 Faz 3: Image Generation (2-3 saat)

### 3.1 FAL.AI Entegrasyonu (En Basit)
**Dosyalar:**
- `backend/routes/image_new.py` ✅ Hazır
- `backend/core/image_models.py` ✅ Hazır
- `backend/core/ai_provider_manager.py` ✅ Hazır

**Yapılacak:**
1. FAL.AI API key kontrolü (.env)
2. Tek model ile test (FLUX Schnell - en ucuz)
3. Kredi düşme sistemi
4. Sonuç URL'i döndürme

**Test Endpoint'leri:**
- GET `/api/v1/image/models`
- POST `/api/v1/image/generate`

**Frontend Test:**
- ImageGenerate sayfasında model seçimi
- Prompt girişi
- Generate butonu
- Sonuç gösterimi

### 3.2 Diğer Provider'lar (Opsiyonel)
- Replicate
- Pollo.ai

---

## 📋 Faz 4: Video Generation (2-3 saat)

### 4.1 Pollo.ai Entegrasyonu
**Dosyalar:**
- `backend/routes/video_new.py` ✅ Hazır
- `backend/core/pollo_models.py` ✅ Hazır

**Yapılacak:**
1. Pollo.ai API key kontrolü
2. Text-to-video test
3. Webhook sistemi (opsiyonel - polling ile başla)

**Test Endpoint'leri:**
- GET `/api/v1/video/models`
- POST `/api/v1/video/generate`

---

## 📋 Faz 5: Audio Generation (1-2 saat)

### 5.1 ElevenLabs TTS
**Dosyalar:**
- `backend/routes/audio_extended.py` ✅ Hazır
- `backend/core/audio_models.py` ✅ Hazır

**Yapılacak:**
1. ElevenLabs API key kontrolü
2. Basit TTS testi
3. Ses dosyası storage

**Test Endpoint'leri:**
- GET `/api/v1/audio/models/tts`
- POST `/api/v1/audio/tts`

---

## 📋 Faz 6: Media Library (1 saat)

### 6.1 Dosya Storage
**Dosyalar:**
- `backend/routes/media.py` ✅ Hazır
- `backend/services/storage_service.py` ✅ Hazır

**Yapılacak:**
1. Cloudflare R2 veya local storage
2. Media listesi endpoint'i
3. Download endpoint'i

**Test Endpoint'leri:**
- GET `/api/v1/media`
- GET `/api/v1/media/{id}/download`

---

## 📋 Faz 7: Billing & Payments (2-3 saat)

### 7.1 Kredi Paketleri
**Dosyalar:**
- `backend/routes/billing.py` ✅ Hazır
- `backend/core/pricing_config.py` ✅ Hazır

**Yapılacak:**
1. Paket listesi endpoint'i
2. Mock ödeme (test için)
3. Gerçek ödeme entegrasyonu (LemonSqueezy/NOWPayments)

**Test Endpoint'leri:**
- GET `/api/v1/billing/packages`
- POST `/api/v1/billing/purchase`

---

## 📋 Faz 8: Admin Panel (1-2 saat)

### 8.1 Admin Dashboard
**Dosyalar:**
- `backend/routes/admin.py` ✅ Hazır
- `backend/routes/admin_enhanced.py` ✅ Hazır

**Yapılacak:**
1. Admin role kontrolü
2. Kullanıcı listesi
3. Platform istatistikleri
4. Kredi yönetimi

**Test Endpoint'leri:**
- GET `/api/v1/admin/stats`
- GET `/api/v1/admin/users`
- POST `/api/v1/admin/users/{id}/credits`

---

## 📋 Faz 9: Chat (Opsiyonel - 1-2 saat)

### 9.1 AI Chat
**Dosyalar:**
- `backend/routes/chat.py` ✅ Hazır

**Yapılacak:**
1. Fireworks AI veya OpenAI entegrasyonu
2. Conversation history
3. Streaming response (opsiyonel)

---

## 📋 Faz 10: Synapse Agent (Opsiyonel - 2-3 saat)

### 10.1 Manus API
**Dosyalar:**
- `backend/routes/synapse.py` ✅ Hazır
- `backend/services/synapse_service.py` ✅ Hazır

**Yapılacak:**
1. Manus API key kontrolü
2. Task oluşturma
3. Webhook callback
4. Task status polling

---

## 🔧 Entegrasyon Stratejisi

### Adım 1: Hybrid Backend Oluştur
`backend/hybrid_simple_main.py` oluştur:
- Mock endpoint'ler varsayılan
- Hazır olan endpoint'leri gerçek backend'den import et
- Aşamalı geçiş yap

### Adım 2: Environment Variables
`.env` dosyasını kontrol et:
```bash
# Minimum gereksinimler
MONGODB_URL=mongodb+srv://...
JWT_SECRET_KEY=...
FAL_API_KEY=...  # İlk test için
```

### Adım 3: Test Sırası
1. ✅ Backend başlat
2. ✅ Frontend başlat
3. ✅ Login/Register test et
4. ✅ Dashboard'a giriş
5. ✅ Image generation test et
6. ✅ Kredi düşüşünü kontrol et
7. ✅ Media library'de sonucu gör

---

## 📊 Öncelik Sıralaması

### 🔥 Kritik (Hemen yapılmalı)
1. **Auth sistemi** - Giriş/Kayıt
2. **Kredi sistemi** - Temel işleyiş
3. **Image generation** - Ana özellik

### ⚡ Yüksek Öncelik (1 hafta içinde)
4. **Video generation** - Ana özellik
5. **Audio generation** - Ana özellik
6. **Media library** - Sonuçları görme

### 📌 Orta Öncelik (2 hafta içinde)
7. **Billing** - Ödeme sistemi
8. **Admin panel** - Yönetim

### 🎯 Düşük Öncelik (İsteğe bağlı)
9. **Chat** - Ekstra özellik
10. **Synapse** - Gelişmiş özellik

---

## 🚀 Hızlı Başlangıç

### Bugün Yapılacaklar (2-3 saat)
1. ✅ Database setup
2. ✅ Auth sistemi aktif et
3. ✅ Kredi sistemi test et
4. ✅ FAL.AI ile ilk image generation

### Bu Hafta Yapılacaklar
- Video generation (Pollo.ai)
- Audio generation (ElevenLabs)
- Media library
- Billing (mock ödeme)

### Gelecek Hafta
- Gerçek ödeme entegrasyonu
- Admin panel
- Chat & Synapse (opsiyonel)

---

## 📝 Notlar

### Kullanılmayan Dosyalar (Şimdilik)
- `celery_app.py` - Background tasks (ileride)
- `core/tasks/*` - Scheduled jobs (ileride)
- `websocket_enhanced.py` - Real-time (opsiyonel)
- `supabase_client.py` - Alternative storage (opsiyonel)

### Test Kullanıcıları
```
Email: demo@example.com
Password: demo123
Credits: 1000

Email: admin@example.com
Password: admin123
Role: admin
```

---

## ✅ Başarı Kriterleri

### Minimum Viable Product (MVP)
- [ ] Kullanıcı kayıt/giriş yapabiliyor
- [ ] Kredi sistemi çalışıyor
- [ ] En az 1 image model çalışıyor
- [ ] Üretilen görseller kaydediliyor
- [ ] Media library'de görseller görünüyor

### Full Product
- [ ] Tüm image modelleri çalışıyor
- [ ] Video generation çalışıyor
- [ ] Audio generation çalışıyor
- [ ] Ödeme sistemi çalışıyor
- [ ] Admin panel çalışıyor

---

## 🎯 Sonraki Adım

**ŞİMDİ YAPILACAK:**
1. `hybrid_simple_main.py` oluştur
2. Auth endpoint'lerini gerçek backend'e bağla
3. Frontend'de test et
4. Kredi sistemini aktif et
5. İlk image generation'ı test et

Hazır mısın? 🚀
