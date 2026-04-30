# Technology Stack

## Programming Languages

### Backend
- **Python 3.11+**: Primary backend language
  - Type hints for better IDE support and runtime validation
  - Async/await for concurrent I/O operations
  - Modern syntax features (match statements, union types)

### Frontend
- **TypeScript 5.9.3**: Strongly-typed JavaScript
  - Strict mode enabled for maximum type safety
  - Interface-based API contracts
  - Generic types for reusable components

### Configuration
- **JavaScript/JSON**: Configuration files (Vite, ESLint, Tailwind)
- **YAML**: Docker Compose and monitoring configs

## Backend Technologies

### Web Framework
- **FastAPI 0.109.0**: Modern async web framework
  - Automatic OpenAPI/Swagger documentation
  - Pydantic integration for request/response validation
  - Dependency injection system
  - WebSocket support

### Server
- **Uvicorn 0.27.0**: ASGI server with standard extras
  - HTTP/1.1 and WebSocket support
  - Auto-reload for development
  - Production-ready with Gunicorn workers

### Database
- **MongoDB**: NoSQL document database
  - **Motor 3.3.2**: Async MongoDB driver for Python
  - AsyncIOMotorClient for non-blocking database operations
  - 11 collections for structured data storage

### Caching & Task Queue
- **Redis 5.0.1**: In-memory data store
  - Session caching
  - Rate limiting counters
  - Celery message broker
- **Celery 5.3.4**: Distributed task queue
  - Background job processing
  - Scheduled tasks (cleanup, analytics)

### Authentication & Security
- **PyJWT 2.8.0**: JSON Web Token implementation
- **python-jose[cryptography] 3.3.0**: JWT with cryptographic signing
- **bcrypt 4.1.2**: Password hashing
- **authlib 1.3.0**: OAuth 2.0 client library
- **itsdangerous 2.1.2**: Secure token generation

### HTTP Client
- **httpx 0.26.0**: Async HTTP client for external API calls
  - Connection pooling
  - Timeout management
  - Retry logic

### File Processing
- **Pillow 12.0.0+**: Image manipulation
- **opencv-python 4.8.1.78**: Video processing
- **python-magic 0.4.27**: File type detection
- **aiofiles 23.2.1**: Async file I/O

### Cloud Storage
- **boto3 1.34.0**: AWS S3 / Cloudflare R2 SDK
- **supabase 2.3.4**: Supabase client (storage, auth, real-time)

### Monitoring & Logging
- **loguru 0.7.2**: Structured logging with rotation
- **sentry-sdk[fastapi] 1.40.0**: Error tracking and performance monitoring
- **slowapi 0.1.9**: Rate limiting middleware
- **posthog 3.1.0**: Product analytics

### AI Provider SDKs
- **anthropic 0.18.1**: Claude API client
- **google-cloud-texttospeech 2.16.3**: Google TTS API
- **web3 6.15.0**: Ethereum blockchain interaction
- **eth-account 0.11.0**: Ethereum account management

### Communication
- **fastapi-mail 1.4.1**: Email sending
- **sendgrid 6.11.0**: Email delivery service
- **twilio 8.12.0**: SMS notifications
- **websockets 12.0**: WebSocket protocol implementation

### Utilities
- **pydantic 2.5.3**: Data validation and settings management
- **pydantic-settings 2.1.0**: Environment variable loading
- **python-dotenv 1.0.0**: .env file parsing
- **python-dateutil 2.8.2**: Date/time utilities
- **python-multipart 0.0.6**: Multipart form data parsing

## Frontend Technologies

### UI Framework
- **React 19.2.0**: Component-based UI library
  - Functional components with hooks
  - Concurrent rendering features
- **React DOM 19.2.0**: React renderer for web

### Build Tool
- **Vite 7.2.2**: Next-generation frontend tooling
  - Lightning-fast HMR (Hot Module Replacement)
  - Optimized production builds
  - Native ES modules in development
- **@vitejs/plugin-react 5.1.0**: React support for Vite

### Routing
- **react-router-dom 7.9.5**: Client-side routing
  - Nested routes
  - Lazy loading
  - Navigation guards

### State Management
- **zustand 5.0.8**: Lightweight state management
  - Simple API without boilerplate
  - TypeScript-first design
  - Middleware support

### Data Fetching
- **axios 1.13.2**: HTTP client
  - Request/response interceptors
  - Automatic JSON transformation
  - Error handling
- **@tanstack/react-query 5.90.7**: Server state management
  - Caching and invalidation
  - Background refetching
  - Optimistic updates

### Forms
- **react-hook-form 7.66.0**: Performant form library
  - Minimal re-renders
  - Built-in validation
- **@hookform/resolvers 5.2.2**: Validation schema resolvers
- **zod 4.1.12**: TypeScript-first schema validation

### Styling
- **TailwindCSS 3.4.18**: Utility-first CSS framework
  - Custom design system
  - Responsive utilities
  - Dark mode support
- **PostCSS 8.5.6**: CSS transformation tool
- **Autoprefixer 10.4.21**: Vendor prefix automation
- **class-variance-authority 0.7.1**: Component variant management
- **clsx 2.1.1**: Conditional class names
- **tailwind-merge 3.4.0**: Tailwind class merging utility

### UI Components
- **lucide-react 0.548.0**: Icon library (1000+ icons)
- **@radix-ui/react-scroll-area 1.2.10**: Accessible scroll container
- **@radix-ui/react-tabs 1.1.13**: Accessible tabs component

### Charts & Visualization
- **chart.js 4.4.0**: Canvas-based charting library
- **react-chartjs-2 5.2.0**: React wrapper for Chart.js
- **chartjs-adapter-date-fns 3.0.0**: Date axis support

### Internationalization
- **i18next 23.7.6**: i18n framework
- **react-i18next 13.5.0**: React bindings for i18next
- **i18next-browser-languagedetector 7.2.0**: Language detection

### Development Tools
- **TypeScript 5.9.3**: Type checker and compiler
- **ESLint 9.36.0**: JavaScript/TypeScript linter
  - **@eslint/js 9.36.0**: ESLint core rules
  - **eslint-plugin-react-hooks 5.2.0**: React hooks linting
  - **eslint-plugin-react-refresh 0.4.22**: React Fast Refresh linting
  - **typescript-eslint 8.45.0**: TypeScript ESLint parser
- **globals 15.0.0**: Global variable definitions

## AI Service Providers

### Chat & Text
- **Fireworks AI**: Fast inference for open-source LLMs
- **OpenAI**: GPT models for chat completion

### Image Generation
- **Fal.ai**: 25+ models (FLUX Pro/Dev/Schnell, SDXL, PhotoMaker, Face Swap)
- **Replicate**: 15+ models (Midjourney style, DALL-E 3 style, Stable Diffusion)

### Video Generation
- **Pollo.ai**: 43 models (text-to-video, image-to-video) + 21 effects + 5 packages

### Audio Generation
- **ElevenLabs**: Voice synthesis and cloning (Turbo v2, Multilingual v2)
- **Google TTS**: Text-to-speech (Standard, WaveNet, Neural2)

### Agent Platform
- **Manus API**: Autonomous agent execution with webhook callbacks

## Payment Providers
- **LemonSqueezy**: Credit card payments
- **NOWPayments**: Cryptocurrency payments
- **Binance Pay**: Binance ecosystem payments
- **MetaMask**: Web3 wallet integration (15% discount)

## Development Commands

### Backend Setup
```bash
# Navigate to backend
cd ai-saas-production/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# Activate virtual environment (Unix/macOS)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Install optional dependencies
pip install -r requirements-optional.txt

# Install production dependencies
pip install -r requirements-production.txt

# Configure environment
cp .env.example .env
# Edit .env with your API keys and configuration

# Run development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Run with Gunicorn (production)
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

# Run simple version
python simple_main.py

# Run hybrid version (MongoDB + Supabase)
python hybrid_main.py

# Database setup
python scripts/setup_database.py

# Seed test data
python scripts/seed_database.py

# Validate configuration
python scripts/validate_config.py

# Test authentication
python scripts/test_auth.py

# Run tests
pytest tests/ -v

# Check health
curl http://localhost:8000/health
```

### Frontend Setup
```bash
# Navigate to frontend
cd ai-saas-production/frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with backend API URL

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run tests
npm run test
```

### Docker Commands
```bash
# Navigate to project root
cd ai-saas-production

# Build and start all services
docker-compose up -d

# Build without cache
docker-compose build --no-cache

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Production deployment
docker-compose -f docker-compose.production.yml up -d

# Scale services
docker-compose up -d --scale backend=3
```

### Database Commands
```bash
# Connect to MongoDB
mongosh mongodb://localhost:27017/ai_saas

# Create indexes
node scripts/mongo-init.js

# Backup database
mongodump --db ai_saas --out backup/

# Restore database
mongorestore --db ai_saas backup/ai_saas/

# Export collection
mongoexport --db ai_saas --collection users --out users.json

# Import collection
mongoimport --db ai_saas --collection users --file users.json
```

## Environment Variables

### Backend (.env)
```bash
# Application
APP_NAME=AI SaaS Platform
ENVIRONMENT=development

# Database
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=ai_saas

# Security
JWT_SECRET_KEY=your-secret-key-min-32-chars
JWT_ALGORITHM=HS256
JWT_EXPIRATION_MINUTES=1440

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Redis
REDIS_URL=redis://localhost:6379

# Sentry
SENTRY_DSN=
SENTRY_ENVIRONMENT=development

# AI Providers
FIREWORKS_API_KEY=
OPENAI_API_KEY=
REPLICATE_API_KEY=
FAL_API_KEY=
POLLO_API_KEY=
ELEVENLABS_API_KEY=
GOOGLE_TTS_API_KEY=
MANUS_API_KEY=

# Storage
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
SUPABASE_URL=
SUPABASE_KEY=

# Payment
LEMONSQUEEZY_API_KEY=
NOWPAYMENTS_API_KEY=
BINANCE_API_KEY=
METAMASK_DISCOUNT_PERCENT=15

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

# Email
SENDGRID_API_KEY=
FROM_EMAIL=

# SMS
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:8000/api/v1
VITE_WS_URL=ws://localhost:8000/ws
VITE_APP_NAME=AI SaaS Platform
VITE_SENTRY_DSN=
```

## API Documentation
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## Monitoring & Metrics
- **Prometheus**: http://localhost:9090
- **Metrics Endpoint**: http://localhost:8000/metrics
- **Health Check**: http://localhost:8000/health
