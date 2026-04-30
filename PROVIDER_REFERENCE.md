# AI Provider Reference - Detaylı Liste

> **Son Güncelleme**: Bu dosya tüm AI provider'ların model, fiyat ve özelliklerini içerir.
> **Kaynak Dosyalar**: `core/image_models.py`, `core/pollo_models.py`, `core/audio_models.py`

## Image Generation Providers

### Fal.ai Models (25+ models)
```python
FAL_MODELS = [
    # FLUX Models
    {"id": "fal-flux-pro", "name": "FLUX Pro", "credits": 12, "quality": 10},
    {"id": "fal-flux-dev", "name": "FLUX Dev", "credits": 8, "quality": 9},
    {"id": "fal-flux-schnell", "name": "FLUX Schnell", "credits": 4, "quality": 8},
    
    # SDXL Models
    {"id": "fal-sdxl", "name": "Stable Diffusion XL", "credits": 6, "quality": 8},
    {"id": "fal-sdxl-turbo", "name": "SDXL Turbo", "credits": 3, "quality": 7},
    
    # Specialized Models
    {"id": "fal-photomaker", "name": "PhotoMaker", "credits": 10, "quality": 9},
    {"id": "fal-face-swap", "name": "Face Swap", "credits": 8, "quality": 8},
    {"id": "fal-rembg", "name": "Remove Background", "credits": 2, "quality": 9},
]
```

### Replicate Models (15+ models)
```python
REPLICATE_MODELS = [
    {"id": "rep-midjourney", "name": "Midjourney Style", "credits": 10, "quality": 9},
    {"id": "rep-dalle3", "name": "DALL-E 3 Style", "credits": 12, "quality": 10},
    {"id": "rep-stable-diffusion", "name": "Stable Diffusion", "credits": 5, "quality": 8},
]
```

## Video Generation - Pollo.ai

### Models (43 total)
```python
POLLO_MODELS = [
    # Text-to-Video
    {"id": "pollo-t2v-v1", "name": "Pollo T2V v1", "credits": 20, "duration": "3s"},
    {"id": "pollo-t2v-v2", "name": "Pollo T2V v2", "credits": 25, "duration": "5s"},
    
    # Image-to-Video
    {"id": "pollo-i2v-v1", "name": "Pollo I2V v1", "credits": 15, "duration": "3s"},
    {"id": "pollo-i2v-v2", "name": "Pollo I2V v2", "credits": 18, "duration": "5s"},
]
```

### Effects (21 total)
```python
POLLO_EFFECTS = [
    {"id": "slow-motion", "name": "Slow Motion", "credits": 8},
    {"id": "time-lapse", "name": "Time Lapse", "credits": 6},
    {"id": "color-grade", "name": "Color Grading", "credits": 10},
    {"id": "stabilize", "name": "Stabilization", "credits": 7},
    {"id": "face-swap", "name": "Face Swap", "credits": 15},
]
```

### Packages (5 total)
```python
POLLO_PACKAGES = [
    {
        "id": "cinematic-pack",
        "name": "Cinematic Pack", 
        "credits": 50,
        "discount": 20,
        "effects": ["slow-motion", "color-grade", "stabilize"]
    },
    {
        "id": "social-pack",
        "name": "Social Media Pack",
        "credits": 30, 
        "discount": 15,
        "effects": ["time-lapse", "face-swap"]
    }
]
```

## Audio Generation

### ElevenLabs
```python
ELEVENLABS_MODELS = [
    {"id": "eleven-turbo", "name": "Turbo v2", "credits": 3, "quality": 8},
    {"id": "eleven-multilingual", "name": "Multilingual v2", "credits": 5, "quality": 9},
    {"id": "eleven-clone", "name": "Voice Clone", "credits": 10, "quality": 10},
]
```

### Google TTS
```python
GOOGLE_TTS_MODELS = [
    {"id": "google-standard", "name": "Standard", "credits": 2, "quality": 7},
    {"id": "google-wavenet", "name": "WaveNet", "credits": 4, "quality": 8},
    {"id": "google-neural", "name": "Neural2", "credits": 6, "quality": 9},
]
```

## 💰 Credit Pricing System

### Credit Packages
```python
PACKAGES = {
    "starter": {"usd": 10, "credits": 1100, "discount": 10},
    "pro": {"usd": 25, "credits": 2800, "discount": 12},
    "enterprise": {"usd": 100, "credits": 12000, "discount": 20}
}
```

### Payment Methods
```python
PAYMENT_METHODS = {
    "credit_card": {"provider": "LemonSqueezy", "discount": 0},
    "crypto": {"provider": "NOWPayments", "discount": 0},
    "binance_pay": {"provider": "Binance", "discount": 0},
    "metamask": {"provider": "MetaMask", "discount": 15}  # 15% discount!
}
```

## 📊 Database Schema
```python
# MongoDB Collections (11 total)
COLLECTIONS = {
    # User Management
    "users": "User accounts (email, password_hash, role, oauth_provider)",
    "user_credits": "Credit balances (user_id, balance, last_updated)",
    "api_keys": "User API keys (user_id, key_hash, name, created_at)",
    
    # Service Usage
    "usage_logs": "Service consumption (user_id, service_type, credits_used, timestamp)",
    "conversations": "Chat history (user_id, messages, model, created_at)",
    "image_generations": "Image records (user_id, prompt, model, output_url)",
    "video_generations": "Video records (user_id, prompt, model, output_url)",
    "synapse_tasks": "Agent tasks (user_id, objective, status, result_url)",
    
    # Media & Billing
    "media_outputs": "Generated files (user_id, media_type, file_url, is_showcase)",
    "service_costs": "Dynamic pricing (service_type, unit, cost_per_unit)",
    "transactions": "Payment records (user_id, amount, credits_purchased, payment_method)"
}
```

## 🔌 API Endpoints (54 total)
- **Auth**: 3 endpoints (register, login, oauth)
- **User**: 8 endpoints (profile, credits, api-keys, transactions)
- **Image**: 5 endpoints (models, tools, generators, generate, my-images)
- **Video**: 6 endpoints (models, effects, packages, generate, my-videos)
- **Audio**: 4 endpoints (models, tts, music, voice-clone)
- **Chat**: 7 endpoints (completions, conversations)
- **Synapse**: 4 endpoints (tasks, status, logs)
- **Media**: 11 endpoints (library, showcase, download)
- **Billing**: 10 endpoints (packages, purchase, invoices)
- **Admin**: 13 endpoints (users, credits, stats, costs)
- **Health**: 2 endpoints (health, metrics)

## 🔑 Environment Variables Checklist
```bash
# Phase 1: Database & Auth
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=ai_saas
JWT_SECRET_KEY=your-secret-key-min-32-chars

# Phase 2: AI Providers
FAL_API_KEY=
REPLICATE_API_KEY=
POLLO_API_KEY=
ELEVENLABS_API_KEY=
FIREWORKS_API_KEY=
OPENAI_API_KEY=

# Phase 3: Storage & Payment
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
LEMONSQUEEZY_API_KEY=
NOWPAYMENTS_API_KEY=
```