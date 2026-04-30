# Frontend API Bağlantı Sorunu Çözümü

## Sorun
Frontend `localhost:8000` portuna bağlanmaya çalışıyor ama backend `localhost:8001` portunda çalışıyor.

## Çözüm 1: Backend'i 8000 Portunda Çalıştır

### simple_main.py'yi Düzenle
```python
# Son satırı değiştir:
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)  # 8001 yerine 8000
```

### Çalıştır
```bash
cd ai-saas-production/backend
python simple_main.py
```

## Çözüm 2: Frontend .env Dosyasını Düzenle

### Frontend .env Dosyası
```bash
# ai-saas-production/frontend/.env
VITE_API_URL=http://localhost:8001/api/v1  # 8000 yerine 8001
```

### Frontend'i Yeniden Başlat
```bash
cd ai-saas-production/frontend
npm run dev
```

## Video Endpoint'leri Durumu

### ✅ Çalışan Endpoint'ler
- `GET /api/v1/video/models` - Video modelleri
- `GET /api/v1/video/effects` - Video efektleri
- `GET /api/v1/video/effect-packages` - Efekt paketleri
- `GET /api/v1/video/my-videos` - Kullanıcı videoları
- `POST /api/v1/video/generate` - Video üretimi

### Mock Data Mevcut
- **43 Video Modeli** (Veo, Sora, Kling, Runway, vb.)
- **21 Video Efekti** (AI Kissing, Earth Zoom, vb.)
- **5 Efekt Paketi** (Romantik, Viral, Animasyon, vb.)

## Test

### 1. Backend Çalışıyor mu?
```bash
curl http://localhost:8001/health
```

### 2. Video Modelleri Geliyor mu?
```bash
curl http://localhost:8001/api/v1/video/models
```

### 3. Video Efektleri Geliyor mu?
```bash
curl http://localhost:8001/api/v1/video/effects
```

## Hızlı Çözüm

**En kolay yol:** Backend'i 8000 portunda çalıştır!

```bash
# simple_main.py son satırını değiştir
uvicorn.run(app, host="0.0.0.0", port=8000)

# Çalıştır
python simple_main.py
```

Artık frontend otomatik olarak bağlanacak!
