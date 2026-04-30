# Project Structure

## Directory Organization

### Root Structure
```
AİSaasManus/
├── ai-saas-production/          # Main application directory
│   ├── backend/                 # FastAPI backend server
│   ├── frontend/                # React frontend application
│   ├── frontend-new/            # Alternative frontend implementation
│   ├── frontend-simple/         # Minimal frontend for testing
│   ├── monitoring/              # Prometheus monitoring configs
│   ├── docker-compose.yml       # Docker orchestration
│   └── [documentation files]    # Comprehensive project docs
├── .amazonq/rules/memory-bank/  # AI assistant memory bank
└── [root-level components]      # Standalone React components
```

## Backend Architecture (`ai-saas-production/backend/`)

### Core Modules (`core/`)
Central business logic and shared utilities:
- **ai_provider_manager.py**: Unified interface for all AI providers (Fireworks, OpenAI, Replicate, Pollo, ElevenLabs, Fal.ai)
- **credits.py**: Credit balance management, deduction, and transaction logging
- **database.py**: MongoDB async connection and collection management
- **config.py**: Environment variable loading and application configuration
- **security.py**: JWT token generation, password hashing, authentication
- **logger.py**: Structured logging with Loguru (file rotation, levels)
- **rate_limiter.py**: DoS protection with slowapi (per-user/IP limits)
- **cache.py**: Redis-based caching for frequently accessed data
- **validation.py**: Input validation utilities and custom validators
- **file_validation.py**: File type, size, and security validation
- **exceptions.py**: Custom exception classes for error handling

#### Model Definitions
- **image_models.py**: Fal.ai and Replicate image model configurations (25+ models)
- **pollo_models.py**: Pollo.ai video models, effects, and packages (43 models, 21 effects)
- **audio_models.py**: ElevenLabs and Google TTS voice configurations
- **pricing_config.py**: Credit rates and service cost calculations

#### Background Tasks (`core/tasks/`)
- **ai_generation.py**: Async AI generation job processing
- **cleanup_tasks.py**: Media file cleanup and retention enforcement
- **email_tasks.py**: Email notification queue processing
- **analytics_tasks.py**: Usage statistics aggregation

### API Routes (`routes/`)
RESTful endpoint implementations organized by feature:
- **auth.py**: Registration, login, OAuth callbacks (3 endpoints)
- **user.py**: Profile management, API keys, transactions (8 endpoints)
- **chat.py**: Chat completions, conversation management (7 endpoints)
- **image.py / image_new.py**: Image generation with multiple providers (5 endpoints)
- **video.py / video_new.py**: Video generation and effects (6 endpoints)
- **audio.py / audio_extended.py**: Audio/voice generation (4 endpoints)
- **synapse.py**: Autonomous agent task management (4 endpoints)
- **media.py**: Media library, showcase, downloads (11 endpoints)
- **billing.py**: Payments, packages, invoices, refunds (10 endpoints)
- **dashboard.py**: User statistics and activity summaries (4 endpoints)
- **admin.py**: User management, platform analytics (13 endpoints)
- **files.py**: File upload, storage, validation (5 endpoints)
- **health.py**: Health checks and system status (1 endpoint)
- **metrics.py**: Prometheus metrics export (1 endpoint)

### Data Schemas (`schemas/`)
Pydantic models for request/response validation:
- **auth.py**: Login, register, token schemas
- **user.py**: User profile, API key, transaction schemas
- **chat.py**: Chat request/response, conversation schemas
- **image_new.py**: Image generation request/response schemas
- **video.py**: Video generation request/response schemas
- **media.py**: Media item, showcase, filter schemas
- **billing.py**: Payment, package, invoice, refund schemas
- **admin.py**: Admin user management, stats schemas
- **synapse.py**: Agent task, log, webhook schemas
- **output.py**: Standardized API response wrappers

### Services (`services/`)
Business logic layer between routes and external systems:
- **auth_service.py**: User authentication and session management
- **oauth_service.py**: OAuth provider integration (Google, GitHub, Discord)
- **image_service.py**: Image generation orchestration across providers
- **video_service.py**: Video generation and effect application
- **audio_service.py**: Audio generation and voice cloning
- **synapse_service.py**: Agent task lifecycle and webhook handling
- **pricing_service.py**: Dynamic pricing calculation and package management
- **storage_service.py**: File storage abstraction (S3/R2)
- **storage_service_supabase.py**: Supabase storage integration
- **realtime_service.py**: WebSocket connection management

### Database Scripts (`scripts/`)
- **setup_database.py**: Initial database schema creation
- **seed_database.py**: Sample data population for testing
- **mongo-init.js**: MongoDB initialization script for Docker
- **validate_config.py**: Environment variable validation
- **test_auth.py**: Authentication flow testing
- **test_supabase_connection.py**: Supabase connectivity verification

### Application Entry Points
- **main.py**: Production FastAPI application with all features
- **simple_main.py**: Minimal FastAPI app for testing
- **hybrid_main.py**: Hybrid MongoDB + Supabase configuration
- **migration_main.py**: Database migration utilities

## Frontend Architecture (`ai-saas-production/frontend/`)

### Source Structure (`src/`)

#### Pages (`pages/`)
Full-page components for each feature:
- **LoginPage.tsx / RegisterPage.tsx**: Authentication flows
- **DashboardPage.tsx**: User dashboard with stats and quick actions
- **ChatPage.tsx / ChatPageAdvanced.tsx**: Chat interface with conversation history
- **ImageGenerationPage.tsx / ImageGenerationPageAdvanced.tsx**: Image generation UI with model selection
- **VideoPage.tsx / VideoPageAdvanced.tsx**: Video generation and effects UI
- **AudioPage.tsx / AudioPageAdvanced.tsx**: Audio generation with voice selection
- **SynapsePage.tsx**: Agent task creation and monitoring
- **MediaLibraryPage.tsx**: Media gallery with filters and showcase
- **ProfilePage.tsx**: User profile and API key management
- **SettingsPage.tsx**: Application settings and preferences

#### Components (`components/`)
Reusable UI components organized by feature:
- **ui/**: Base UI components (button, card, input, select, tabs, etc.)
- **Layout.tsx**: Main application layout with navigation

#### Services (`services/`)
- **api.ts**: Axios HTTP client with interceptors and error handling
- **authService.ts**: Authentication API calls and token management

#### State Management (`store/`)
Zustand stores for global state:
- **authStore.ts**: User authentication state and actions
- **taskStore.ts**: Background task tracking
- **synapseStore.ts**: Agent task state management

#### Utilities (`utils/`)
- **cn.ts**: Tailwind CSS class name utility (clsx + tailwind-merge)

#### Types (`types/`)
TypeScript type definitions:
- **api.ts**: API request/response types
- **auth.ts**: Authentication-related types

### Configuration Files
- **vite.config.js**: Vite build configuration with React plugin
- **tailwind.config.cjs**: Tailwind CSS customization
- **tsconfig.json**: TypeScript compiler options
- **package.json**: Dependencies and build scripts

## Database Collections (MongoDB)

### User Management
- **users**: User accounts (email, password_hash, role, oauth_provider)
- **user_credits**: Credit balances (user_id, balance, last_updated)
- **api_keys**: User-generated API keys (user_id, key_hash, name, created_at)

### Service Usage
- **usage_logs**: Service consumption records (user_id, service_type, credits_used, timestamp)
- **conversations**: Chat conversation history (user_id, messages, model, created_at)
- **image_generations**: Image generation records (user_id, prompt, model, output_url)
- **video_generations**: Video generation records (user_id, prompt, model, output_url)
- **synapse_tasks**: Agent task tracking (user_id, objective, status, result_url)
- **synapse_logs**: Agent execution logs (task_id, log_type, log_message, timestamp)

### Media & Storage
- **media_outputs**: Generated media files (user_id, media_type, file_url, is_showcase, created_at)

### Billing & Pricing
- **service_costs**: Dynamic service pricing (service_type, unit, cost_per_unit)
- **pricing_packages**: Credit packages (name, usd_price, credit_amount, discount_percent)
- **transactions**: Payment records (user_id, amount, credits_purchased, payment_method)
- **invoices**: Invoice generation (user_id, transaction_id, pdf_url, created_at)

### Administration
- **admin_logs**: Admin action audit trail (admin_id, action_type, target_user_id, timestamp)

## Architectural Patterns

### Backend Patterns
- **Layered Architecture**: Routes → Services → Core → Database
- **Dependency Injection**: Database and config passed via FastAPI dependencies
- **Async/Await**: All I/O operations use async for concurrency
- **Repository Pattern**: Database operations abstracted in core modules
- **Factory Pattern**: AI provider manager creates provider instances dynamically
- **Middleware Chain**: CORS → Rate Limiting → Authentication → Logging → Error Handling

### Frontend Patterns
- **Component Composition**: Small, reusable components composed into pages
- **Custom Hooks**: Encapsulate API calls and state logic (useImageGeneration, useMedia, etc.)
- **Centralized State**: Zustand stores for cross-component state sharing
- **Service Layer**: API calls abstracted in services directory
- **Type Safety**: TypeScript interfaces for all API interactions

### Communication Patterns
- **REST API**: Synchronous request/response for most operations
- **WebSocket**: Real-time updates for agent tasks and chat
- **Webhook**: Async callbacks from external AI providers (Pollo, Manus)
- **Polling**: Fallback for task status when WebSocket unavailable

## Deployment Structure

### Docker Compose Services
- **backend**: FastAPI application (port 8000)
- **frontend**: React application (port 5173)
- **mongodb**: Database (port 27017)
- **redis**: Cache and task queue (port 6379)
- **nginx**: Reverse proxy and static file serving (port 80/443)
- **prometheus**: Metrics collection (port 9090)

### Environment Separation
- **Development**: Local MongoDB, hot reload, debug logging
- **Production**: MongoDB Atlas, optimized builds, error tracking (Sentry)
