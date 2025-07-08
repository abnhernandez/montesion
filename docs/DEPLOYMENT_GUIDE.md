# 🚀 Guía de Deployment - Monte Sion

## Índice

- [Environments](#environments)
- [Deployment en Vercel](#deployment-en-vercel)
- [Configuración de Variables](#configuración-de-variables)
- [Backend Deployment](#backend-deployment)
- [Base de Datos](#base-de-datos)
- [Dominios y SSL](#dominios-y-ssl)
- [Monitoreo](#monitoreo)
- [Rollback](#rollback)

## Environments

### Desarrollo Local

```bash
# Requisitos
Node.js 18+
npm/yarn/pnpm/bun

# Setup
git clone https://github.com/usuario/montesion.git
cd montesion
npm install
cp .env.example .env.local
npm run dev
```

### Staging (Preview)

```bash
# URL: https://montesion-git-feature-vercel.app
# Trigger: Pull Request a main
# Variables: Development environment
```

### Producción

```bash
# URL: https://montesion.me
# Trigger: Push a main branch
# Variables: Production environment
```

## Deployment en Vercel

### 1. Configuración Inicial

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Link proyecto
vercel link
```

### 2. Configuración del Proyecto

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": ".next",
  "public": true,
  "regions": ["iad1"],
  "functions": {
    "app/**/*.tsx": {
      "maxDuration": 30
    }
  }
}
```

### 3. Deploy Manual

```bash
# Deploy preview
vercel

# Deploy a producción
vercel --prod
```

### 4. Deploy Automático

```yaml
# .github/workflows/vercel.yml
name: Vercel Production Deployment
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
on:
  push:
    branches:
      - main
jobs:
  Deploy-Production:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Configuración de Variables

### Variables de Entorno Requeridas

#### Frontend (Vercel)

```bash
# Autenticación
NEXT_PUBLIC_AUTH_URL=https://montesion-backend.onrender.com/auth
NEXT_PUBLIC_BACKEND_URL=https://montesion-backend.onrender.com

# APIs Externas
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
NEXT_PUBLIC_PETICIONES_URL=https://montesion-backend.onrender.com/peticiones

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://montesion.me
NEXTAUTH_URL=https://montesion.me
NEXTAUTH_SECRET=tu_nextauth_secret_key
```

#### Backend Variables

```bash
# Base de Datos
DATABASE_URL=postgresql://usuario:password@host:5432/montesion_db

# JWT
JWT_SECRET_KEY=tu_super_secreto_jwt_key_256_bits
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Email SMTP
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=montesion@gmail.com
SMTP_PASSWORD=tu_app_password_gmail

# CORS
ALLOWED_ORIGINS=["https://montesion.me", "https://montesion.vercel.app", "http://localhost:3000"]

# Environment
ENVIRONMENT=production
DEBUG=false
```

### Configuración en Vercel Dashboard

1. **Project Settings** → **Environment Variables**
2. Agregar cada variable con su respectivo valor
3. Configurar por environment (Production, Preview, Development)

```bash
# Production only
NEXT_PUBLIC_AUTH_URL → https://montesion-backend.onrender.com/auth

# Preview only  
NEXT_PUBLIC_AUTH_URL → https://montesion-backend-staging.onrender.com/auth

# Development only
NEXT_PUBLIC_AUTH_URL → http://localhost:8000/auth
```

## Backend Deployment

### FastAPI en Render

#### 1. Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### 2. requirements.txt

```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
psycopg2-binary==2.9.9
sqlalchemy==2.0.23
alembic==1.12.1
pydantic==2.5.0
python-dotenv==1.0.0
emails==0.6.0
```

#### 3. Render Configuration

```yaml
# render.yaml
services:
  - type: web
    name: montesion-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: montesion-db
          property: connectionString
      - key: JWT_SECRET_KEY
        generateValue: true
      - key: ENVIRONMENT
        value: production

databases:
  - name: montesion-db
    databaseName: montesion
    user: montesion_user
```

### Railway Deployment (Alternativa)

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway link
railway up
```

#### railway.json

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "healthcheckPath": "/health"
  }
}
```

## Base de Datos

### Neon Database Setup

#### 1. Crear Proyecto en Neon

```bash
# Via CLI
npm install -g @neondatabase/cli
neon auth
neon projects create montesion --database-name montesion_db
```

#### 2. Obtener Connection String

```bash
postgresql://username:password@ep-xyz.us-east-1.aws.neon.tech/montesion_db?sslmode=require
```

#### 3. Configurar Conexión

```python
# backend/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

#### 4. Migraciones con Alembic

```bash
# Inicializar Alembic
alembic init alembic

# Crear migración
alembic revision --autogenerate -m "Create user tables"

# Aplicar migraciones
alembic upgrade head
```

### PostgreSQL Local (Desarrollo)

```bash
# Docker
docker run --name montesion-postgres \
  -e POSTGRES_USER=montesion \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=montesion_dev \
  -p 5432:5432 \
  -d postgres:15

# Connection string
DATABASE_URL=postgresql://montesion:password@localhost:5432/montesion_dev
```

## Dominios y SSL

### Configuración de Dominio Principal

#### 1. Configurar en Vercel

```bash
# Via CLI
vercel domains add montesion.me

# Via Dashboard
Project Settings → Domains → Add Domain
```

#### 2. DNS Configuration

```dns
# En el proveedor de dominio (Namecheap, GoDaddy, etc.)
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61 (Vercel IP)

Type: CNAME  
Name: *
Value: cname.vercel-dns.com
```

#### 3. SSL Certificate

```bash
# Vercel maneja automáticamente Let's Encrypt
# Verificar en Project Settings → Domains
# SSL Certificate: Provided by Vercel
```

### Subdominios

```bash
# api.montesion.me → Backend
# admin.montesion.me → Panel administrativo
# staging.montesion.me → Environment de staging
```

## Monitoreo

### Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Uptime Monitoring

#### UptimeRobot Configuration

```bash
# Monitors a configurar:
https://montesion.me → Cada 5 minutos
https://api.montesion.me/health → Cada 5 minutos
https://montesion-backend.onrender.com/health → Cada 5 minutos
```

#### Health Check Endpoint

```python
# backend/main.py
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow(),
        "version": "1.0.0"
    }
```

### Error Tracking (Sentry)

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

```python
# backend - sentry integration
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn="YOUR_SENTRY_DSN",
    integrations=[FastApiIntegration()],
    traces_sample_rate=1.0,
)
```

## Rollback

### Rollback en Vercel

#### Via Dashboard

1. **Deployments** → Seleccionar deployment anterior
2. **Promote to Production**
3. Confirmar rollback

#### Via CLI

```bash
# Listar deployments
vercel ls

# Rollback a deployment específico
vercel rollback [deployment-url] --prod
```

### Rollback de Base de Datos

```bash
# Con Alembic
alembic downgrade -1  # Un paso atrás
alembic downgrade base  # Todo atrás
alembic downgrade abc123  # A revisión específica

# Backup antes de rollback
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Rollback de Backend

```bash
# Render
git revert [commit-hash]
git push origin main  # Trigger redeploy

# Railway
railway rollback  # Al deployment anterior
```

## Scripts de Deployment

### deploy.sh

```bash
#!/bin/bash
set -e

echo "🚀 Starting deployment process..."

# Build checks
echo "🔍 Running pre-deployment checks..."
npm run lint
npm run build

# Tests (si los hay)
# npm run test

# Deploy to staging first
echo "📦 Deploying to staging..."
vercel --scope=montesion

# Wait for confirmation
read -p "✅ Staging deployment successful. Deploy to production? (y/N): " confirm
if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
    echo "🌟 Deploying to production..."
    vercel --prod --scope=montesion
    echo "✅ Production deployment complete!"
else
    echo "❌ Production deployment cancelled."
fi
```

### rollback.sh

```bash
#!/bin/bash
set -e

echo "⏪ Starting rollback process..."

# List recent deployments
echo "📋 Recent deployments:"
vercel ls --scope=montesion

# Get deployment ID
read -p "Enter deployment ID to rollback to: " deployment_id

# Confirm rollback
read -p "⚠️  Confirm rollback to $deployment_id? (y/N): " confirm
if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
    vercel rollback $deployment_id --prod --scope=montesion
    echo "✅ Rollback complete!"
else
    echo "❌ Rollback cancelled."
fi
```

## Checklist de Deployment

### Pre-deployment

- [ ] **Tests** pasan correctamente
- [ ] **Linting** sin errores
- [ ] **Build** exitoso en local
- [ ] **Variables de entorno** configuradas
- [ ] **Dependencies** actualizadas
- [ ] **Backup de BD** realizado

### Post-deployment

- [ ] **Sitio web** carga correctamente
- [ ] **Autenticación** funciona
- [ ] **APIs** responden
- [ ] **Mapas** se cargan
- [ ] **Formularios** envían datos
- [ ] **SSL** activo
- [ ] **Performance** dentro de límites
- [ ] **Error tracking** activo

### Rollback Checklist

- [ ] **Identificar** deployment problemático
- [ ] **Rollback** de frontend
- [ ] **Rollback** de backend (si necesario)
- [ ] **Rollback** de BD (si necesario)
- [ ] **Verificar** funcionamiento
- [ ] **Comunicar** a stakeholders
- [ ] **Analizar** causa del problema

## Troubleshooting Deployment

### Error: Build Failed

```bash
# Error común: Module not found
Error: Module not found: Can't resolve '@/components/...'

# Solución:
# Verificar tsconfig.json paths
# Verificar imports case-sensitive
# Limpiar cache: rm -rf .next node_modules && npm install
```

### Error: Environment Variables

```bash
# Error: process.env.VARIABLE is undefined

# Solución:
# 1. Verificar nombre exacto en Vercel dashboard
# 2. Verificar environment (production/preview/development)
# 3. Redeploy después de cambios en variables
```

### Error: Database Connection

```bash
# Error: connection refused

# Solución:
# 1. Verificar DATABASE_URL formato
# 2. Verificar IP whitelist en Neon
# 3. Verificar SSL mode (?sslmode=require)
```

### Error: API CORS

```bash
# Error: blocked by CORS policy

# Solución backend:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://montesion.me"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

Esta guía cubre todo el proceso de deployment para el proyecto Monte Sion. Para situaciones específicas no cubiertas aquí, consultar la documentación oficial de las plataformas utilizadas o contactar al equipo de desarrollo.
