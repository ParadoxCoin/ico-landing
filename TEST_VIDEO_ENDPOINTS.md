# Video Endpoint Test Rehberi

## Backend'i Başlat
```bash
cd ai-saas-production/backend
python simple_main.py
```

## Test Komutları

### 1. Video Modelleri (GET)
```bash
curl http://localhost:8000/api/v1/video/models
```

**Beklenen**: 10 video modeli listesi

### 2. Video Efektleri (GET)
```bash
curl http://localhost:8000/api/v1/video/effects
```

**Beklenen**: 20 video efekti listesi

### 3. Efekt Paketleri (GET)
```bash
curl http://localhost:8000/api/v1/video/effect-packages
```

**Beklenen**: 5 efekt paketi listesi

### 4. Video Üretimi (POST)
```bash
curl -X POST http://localhost:8000/api/v1/video/generate ^
  -H "Content-Type: application/json" ^
  -d "{\"prompt\": \"a cat playing piano\", \"model_id\": \"kling25_turbo_text_5s\"}"
```

**Beklenen**:
```json
{
  "success": true,
  "task_id": "uuid-here",
  "status": "processing",
  "credits_used": 35,
  "model_used": "Kling 2.5 Turbo, 5s, text to video",
  "estimated_time": 60,
  "message": "Video generation started..."
}
```

### 5. Efekt Uygulama (POST)
```bash
curl -X POST http://localhost:8000/api/v1/video/effects/apply ^
  -H "Content-Type: application/json" ^
  -d "{\"effect_id\": \"earth_zoom\", \"image_url\": \"https://example.com/image.jpg\"}"
```

**Beklenen**:
```json
{
  "success": true,
  "task_id": "uuid-here",
  "status": "processing",
  "credits_used": 15,
  "model_used": "Earth Zoom In",
  "estimated_time": 30
}
```

### 6. Task Durumu (GET)
```bash
curl http://localhost:8000/api/v1/video/tasks/test-task-id
```

**Beklenen**:
```json
{
  "task_id": "test-task-id",
  "status": "processing",
  "progress": 50,
  "video_url": null,
  "thumbnail_url": null
}
```

## Frontend Test

### Browser Console'da Test
```javascript
// Video modelleri
fetch('http://localhost:8000/api/v1/video/models')
  .then(r => r.json())
  .then(d => console.log('Models:', d))

// Video üretimi
fetch('http://localhost:8000/api/v1/video/generate', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    prompt: 'a cat',
    model_id: 'kling25_turbo_text_5s'
  })
})
  .then(r => r.json())
  .then(d => console.log('Generate:', d))

// Efekt uygulama
fetch('http://localhost:8000/api/v1/video/effects/apply', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    effect_id: 'earth_zoom',
    image_url: 'https://example.com/image.jpg'
  })
})
  .then(r => r.json())
  .then(d => console.log('Effect:', d))
```

## Sorun Giderme

### Backend çalışmıyor?
```bash
# Port kontrolü
netstat -ano | findstr :8000

# Başka bir process varsa kapat
taskkill /PID <PID> /F

# Tekrar başlat
python simple_main.py
```

### CORS hatası?
Backend'de CORS zaten açık:
- `http://localhost:5173`
- `http://localhost:3000`
- `http://localhost:3001`

### Endpoint bulunamıyor?
URL'yi kontrol et:
- ✅ `http://localhost:8000/api/v1/video/models`
- ❌ `http://localhost:8000/video/models` (api/v1 eksik)

## Başarı Kriterleri

✅ Backend 8000 portunda çalışıyor
✅ GET endpoint'leri veri dönüyor
✅ POST endpoint'leri task_id dönüyor
✅ Validation hataları doğru mesaj veriyor
✅ Frontend butonlar tepki veriyor

**Tüm testler geçerse sistem hazır!** 🎉
