# 🏗️ Architecture Overview - Monte Sion

*Documentación completa de la arquitectura del sistema Monte Sion.*

---

## 📋 Resumen Ejecutivo

Monte Sion es una aplicación web moderna construida con Next.js 14 que utiliza una arquitectura de microservicios distribuida. El sistema está diseñado para ser escalable, mantenible y proporcionar una experiencia de usuario excepcional para la comunidad cristiana.

### Características Principales

- **Frontend**: Next.js 14 con App Router y TypeScript
- **Backend**: Múltiples servicios especializados (FastAPI, Python)
- **Base de Datos**: PostgreSQL con NeonDB
- **Deployment**: Vercel (Frontend) + Railway/Render (Backend)
- **Autenticación**: JWT con refresh tokens
- **Maps**: Google Maps JavaScript API
- **Monitoreo**: Vercel Analytics + Custom monitoring

---

## 🏛️ Arquitectura del Sistema

### Diagrama de Alto Nivel

```
┌─────────────────────────────────────────────────────────────┐
│                        CDN (Vercel Edge)                    │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                  Next.js Frontend                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │    Pages    │ │ Components  │ │      Auth Context       │ │
│  │             │ │             │ │                         │ │
│  │ • Home      │ │ • UI System │ │ • User Management       │ │
│  │ • Auth      │ │ • Maps      │ │ • Token Handling        │ │
│  │ • Prayer    │ │ • Forms     │ │ • State Management      │ │
│  │ • Temples   │ │ • Layout    │ │                         │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │
           ┌──────────┼──────────┐
           │          │          │
           ▼          ▼          ▼
    ┌──────────┐ ┌──────────┐ ┌─────────────┐
    │   Auth   │ │ Prayer   │ │   Google    │
    │ Service  │ │ Service  │ │    Maps     │
    │          │ │          │ │             │
    │ FastAPI  │ │ FastAPI  │ │   API       │
    │ Railway  │ │ Custom   │ │             │
    └────┬─────┘ └────┬─────┘ └─────────────┘
         │            │
         ▼            ▼
   ┌──────────┐ ┌──────────┐
   │PostgreSQL│ │   Email  │
   │  NeonDB  │ │ Service  │
   └──────────┘ └──────────┘
```

---

## 🎯 Frontend Architecture

### Next.js 14 App Router Structure

```
app/
├── layout.tsx                 # Root layout with navigation
├── page.tsx                   # Homepage with discipleship process
├── auth-context.tsx           # Global authentication state
├── globals.css                # Global styles and Tailwind
├── loading.tsx                # Global loading UI
├── error.tsx                  # Global error boundary
├── not-found.tsx             # 404 page
│
├── users/                     # Authentication pages
│   ├── sign_in/
│   │   └── page.tsx          # Login form with validation
│   ├── sign_up/
│   │   └── page.tsx          # Registration with password rules
│   ├── password/
│   │   ├── new/page.tsx      # Password reset request
│   │   └── check_email/page.tsx
│   └── reset_password/
│       └── [token]/page.tsx   # Password reset confirmation
│
├── oracion/                   # Prayer request system
│   ├── layout.tsx
│   └── page.tsx              # Prayer form with validation
│
├── templos/                   # Temple locator
│   ├── layout.tsx
│   └── page.tsx              # Interactive map with search
│
├── contact/                   # Contact information
├── terms/                     # Terms of service
├── privacy/                   # Privacy policy
├── declaraciondefe/          # Faith declaration
├── nuestra-mision-vison/     # Mission and vision
└── [other-pages]/            # Additional institutional pages
```

### Component Architecture

```
components/
├── ui/                        # Design system components
│   ├── button.tsx            # Reusable button with variants
│   ├── input.tsx             # Form input with validation
│   ├── card.tsx              # Content card component
│   ├── dialog.tsx            # Modal dialog system
│   ├── toast.tsx             # Notification system
│   ├── maps.tsx              # Google Maps integration
│   ├── peticiondeoracion.tsx # Prayer request form
│   ├── hero.tsx              # Homepage hero section
│   ├── BlurText.tsx          # Animated text effects
│   └── [other-ui]/           # Additional UI components
│
├── BarradeNavegacion.tsx     # Main navigation bar
├── Footer.tsx                # Site footer with links
├── MapaTemplos.tsx           # Temple map component
├── TemploCard.tsx            # Individual temple display
└── FooterSocialIcons.tsx     # Social media links
```

### State Management

#### Authentication Context

```typescript
// app/auth-context.tsx
interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  requestPasswordReset: (email: string) => Promise<void>
  confirmPasswordReset: (token: string, password: string) => Promise<void>
  deleteAccount: () => Promise<void>
}
```

#### Local State Patterns

```typescript
// Form state with validation
const [formData, setFormData] = useState({
  nombre: "",
  correo_electronico: "",
  password: ""
});

// Loading states
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// Validation state
const [validaciones, setValidaciones] = useState<Record<string, 'valid' | 'invalid' | 'unset'>>({});
```

---

## 🔧 Backend Architecture

### Microservices Overview

#### 1. Authentication Service

**Technology**: FastAPI + PostgreSQL  
**Deployment**: Railway/Render  
**Responsibilities**:
- User registration and login
- JWT token management
- Password reset functionality
- Account management

**API Structure**:
```
/auth
├── POST /token              # User login
├── POST /register           # User registration
├── GET /auth               # Get current user
├── POST /password-reset    # Request password reset
├── POST /password-reset/confirm # Confirm reset
└── DELETE /delete          # Delete account
```

#### 2. Prayer Requests Service

**Technology**: Custom API  
**Deployment**: Separate service  
**Responsibilities**:
- Receive prayer requests
- Validate and sanitize input
- Send notifications to prayer team
- Store requests securely

**API Structure**:
```
/peticiones
└── POST /peticion          # Submit prayer request
```

#### 3. Newsletter Service

**Technology**: Email service integration  
**Deployment**: Integrated with main backend  
**Responsibilities**:
- Email subscription management
- Newsletter distribution
- Email template management

---

## 🗄️ Database Design

### PostgreSQL Schema (NeonDB)

#### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Prayer Requests Table
```sql
CREATE TABLE prayer_requests (
    id SERIAL PRIMARY KEY,
    ticket INTEGER UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL,
    asunto VARCHAR(200) NOT NULL,
    peticion TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP
);
```

#### Newsletter Subscriptions
```sql
CREATE TABLE newsletter_subscriptions (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    unsubscribe_token VARCHAR(255) UNIQUE
);
```

### Data Flow

```
Frontend Form → Validation → API Request → Backend Service → Database
     ↑                                                           ↓
User Input                                               Data Persistence
     ↑                                                           ↓
UI Updates ← Response ← API Response ← Business Logic ← Query Result
```

---

## 🔐 Security Architecture

### Authentication Flow

```
1. User submits credentials
2. Backend validates against database
3. JWT token generated with user claims
4. Token sent to frontend
5. Token stored in localStorage
6. Token included in subsequent requests
7. Backend validates token on each request
8. User data returned if valid
```

### Security Measures

#### Frontend Security
- Input validation with Zod schemas
- XSS prevention through React's built-in protection
- CSRF protection through SameSite cookies
- Content Security Policy headers
- HTTPS enforcement

#### Backend Security
- Password hashing with bcrypt
- JWT token signing and validation
- Rate limiting on sensitive endpoints
- Input sanitization and validation
- SQL injection prevention through parameterized queries
- CORS configuration

#### Infrastructure Security
- Environment variable management
- Secure secret storage
- HTTPS/TLS encryption
- Database connection encryption
- Regular security updates

---

## 🗺️ Maps & Geolocation

### Google Maps Integration

#### Architecture
```
User Location Request
        ↓
Geolocation API (Browser)
        ↓
Google Maps JavaScript API
        ↓
Maps Display + Temple Markers
        ↓
Distance Matrix API
        ↓
Distance Calculations
        ↓
UI Updates with Results
```

#### Key Components

**Maps Component** (`components/ui/maps.tsx`):
- Map initialization and configuration
- Custom styling and themes
- Marker management
- Event handling

**Temple Locator** (`components/MapaTemplos.tsx`):
- Temple data management
- Search and filtering
- Distance calculations
- Responsive design

#### Data Structure
```typescript
interface Temple {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  schedule: {
    domingo: string;
    eventos: string[];
  };
  contact: {
    phone?: string;
    email?: string;
  };
}
```

---

## 📱 Progressive Web App

### PWA Features

#### Manifest Configuration
```json
{
  "name": "Monte Sion Oaxaca",
  "short_name": "Monte Sion",
  "description": "Iglesia Cristiana Monte Sion Oaxaca",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#831111",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

#### Service Worker Strategy
- Cache-first for static assets
- Network-first for API requests
- Offline fallbacks for key pages
- Background sync for form submissions

---

## 🚀 Performance Architecture

### Frontend Optimizations

#### Next.js Optimizations
- **App Router**: Faster navigation with client-side routing
- **Server Components**: Reduced JavaScript bundle size
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Font Optimization**: Self-hosted fonts with preloading
- **Bundle Splitting**: Automatic code splitting by route

#### Loading Strategies
```typescript
// Component-level loading
const MapComponent = dynamic(() => import('./MapComponent'), {
  loading: () => <MapSkeleton />,
  ssr: false
});

// Route-level loading
export default function Loading() {
  return <PageSkeleton />;
}
```

#### Caching Strategy
- **Static Assets**: Cached at CDN level (Vercel Edge)
- **API Responses**: Cached with appropriate TTL
- **Database Queries**: Connection pooling and query optimization
- **Images**: Optimized and cached automatically

### Backend Optimizations

#### Database Performance
- Indexed columns for frequent queries
- Connection pooling
- Query optimization
- Database monitoring

#### API Performance
- Response caching where appropriate
- Efficient JSON serialization
- Async processing for heavy operations
- Rate limiting to prevent abuse

---

## 📊 Monitoring & Observability

### Metrics Collection

#### Frontend Metrics
- **Core Web Vitals**: LCP, FID, CLS
- **User Analytics**: Page views, user flows
- **Error Tracking**: JavaScript errors and crashes
- **Performance**: Load times, bundle sizes

#### Backend Metrics
- **API Response Times**: P50, P95, P99
- **Error Rates**: 4xx and 5xx responses
- **Throughput**: Requests per second
- **Database Performance**: Query times, connection pool

### Monitoring Stack

```
Application Metrics
        ↓
Vercel Analytics (Frontend)
        ↓
Custom Backend Monitoring
        ↓
Database Monitoring (NeonDB)
        ↓
Alerting & Notifications
```

---

## 🔄 Deployment Architecture

### Multi-Environment Setup

#### Development
```
Local Development
├── Next.js Dev Server (localhost:3000)
├── Local API Mocking
└── Local Database (optional)
```

#### Staging
```
Vercel Preview Deployments
├── Feature Branch Previews
├── Staging Backend APIs
└── Staging Database
```

#### Production
```
Vercel Production
├── Edge CDN Distribution
├── Production Backend APIs
└── Production Database (NeonDB)
```

### CI/CD Pipeline

```
GitHub Repository
        ↓
GitHub Actions
        ↓
Build & Test
        ↓
Deploy to Staging
        ↓
Manual Review
        ↓
Deploy to Production
        ↓
Health Checks
        ↓
Monitoring & Alerts
```

---

## 🧪 Testing Architecture

### Testing Strategy

#### Frontend Testing
```
Unit Tests (Jest + Testing Library)
        ↓
Component Tests (React Testing Library)
        ↓
Integration Tests (API Mocking)
        ↓
E2E Tests (Playwright)
        ↓
Visual Regression Tests
```

#### Backend Testing
```
Unit Tests (pytest)
        ↓
Integration Tests (Database)
        ↓
API Tests (FastAPI TestClient)
        ↓
Load Tests (performance)
```

### Test Environment
- Isolated test database
- Mocked external services
- Consistent test data
- Automated test runs on PR

---

## 🔧 Development Workflow

### Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/your-org/monte-sion.git

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local

# 4. Run development server
npm run dev

# 5. Access application
open http://localhost:3000
```

### Code Organization Patterns

#### File Naming Conventions
- **Components**: PascalCase (`BarradeNavegacion.tsx`)
- **Pages**: lowercase (`page.tsx`, `layout.tsx`)
- **Utilities**: camelCase (`utils.ts`)
- **Constants**: UPPER_CASE (`CONSTANTS.ts`)

#### Import Organization
```typescript
// 1. React and Next.js imports
import React from 'react';
import { NextPage } from 'next';

// 2. Third-party libraries
import { motion } from 'framer-motion';

// 3. Internal utilities and hooks
import { useAuth } from '@/app/auth-context';

// 4. Component imports
import { Button } from '@/components/ui/button';

// 5. Type imports (at the end)
import type { User } from '@/types';
```

---

## 🚀 Scalability Considerations

### Horizontal Scaling

#### Frontend Scaling
- **CDN Distribution**: Global edge locations
- **Static Generation**: Pre-rendered pages
- **Component Caching**: Reusable UI components
- **Bundle Optimization**: Tree shaking and code splitting

#### Backend Scaling
- **Service Separation**: Independent microservices
- **Database Scaling**: Read replicas and connection pooling
- **Caching Layers**: Redis for session management
- **Load Balancing**: Multiple service instances

### Performance Bottlenecks

#### Identified Areas
1. **Google Maps Loading**: Lazy loading implementation
2. **Form Validation**: Debounced validation
3. **Image Loading**: Progressive loading with placeholders
4. **API Requests**: Request deduplication and caching

#### Mitigation Strategies
1. **Progressive Enhancement**: Core functionality first
2. **Lazy Loading**: Load components when needed
3. **Caching**: Multi-level caching strategy
4. **Optimization**: Regular performance audits

---

## 📚 Documentation & Knowledge Management

### Technical Documentation
- **Architecture Diagrams**: System overview and data flow
- **API Documentation**: Complete endpoint documentation
- **Component Library**: Storybook for UI components
- **Database Schema**: ERD and migration scripts

### Developer Onboarding
- **Setup Guides**: Step-by-step local development setup
- **Coding Standards**: ESLint and Prettier configurations
- **Git Workflow**: Branch naming and PR guidelines
- **Testing Guidelines**: Test writing and execution

---

## 🔮 Future Architecture Plans

### Short-term Improvements (Q1 2025)
- **Database Optimization**: Query performance improvements
- **Caching Layer**: Redis implementation for sessions
- **API Gateway**: Centralized API management
- **Monitoring Enhancement**: Better observability tools

### Long-term Vision (2025)
- **Microservices Expansion**: Additional specialized services
- **Event-Driven Architecture**: Async communication between services
- **Multi-tenant Support**: Support for multiple church locations
- **AI Integration**: Intelligent content recommendations

---

**Last Updated**: December 21, 2024  
**Architecture Version**: 1.0.0  
**Maintainer**: Development Team Monte Sion
