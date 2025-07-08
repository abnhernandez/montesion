# 📡 API Documentation - Monte Sion

*Documentación completa de todas las APIs utilizadas en el proyecto Monte Sion.*

---

## 🔗 Endpoints Overview

El proyecto Monte Sion utiliza múltiples servicios API especializados:

- **Authentication API**: Gestión de usuarios y autenticación
- **Prayer Requests API**: Manejo de peticiones de oración
- **Newsletter API**: Gestión de suscripciones
- **Google Maps API**: Servicios de geolocalización

---

## 🔐 Authentication API

### Base Configuration

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL || "https://montesion-backend.onrender.com/auth"
```

### Authentication Headers

```typescript
// For authenticated requests
headers: {
  'Authorization': `Bearer ${access_token}`,
  'Content-Type': 'application/json'
}
```

### Endpoints

#### 1. User Login

**Endpoint:** `POST /token`

**Description:** Authenticate user and receive JWT access token

**Headers:**
```
Content-Type: application/x-www-form-urlencoded
```

**Body:**
```
username={email}&password={password}
```

**Success Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Error Response (401):**
```json
{
  "detail": "Credenciales inválidas"
}
```

**Example:**
```typescript
const response = await fetch(`${API_BASE_URL}/token`, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
    username: "usuario@montesion.me",
    password: "MiPassword123!",
  }),
});
```

#### 2. User Registration

**Endpoint:** `POST /register`

**Description:** Create a new user account

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo_electronico": "juan@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response (201):**
```json
{
  "id": 123,
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo_electronico": "juan@example.com",
  "is_active": true
}
```

**Error Response (400):**
```json
{
  "detail": "El correo ya está en uso"
}
```

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (!@#$%^&*)

#### 3. Get Current User

**Endpoint:** `GET /auth`

**Description:** Get current authenticated user information

**Headers:**
```
Authorization: Bearer {access_token}
```

**Success Response (200):**
```json
{
  "id": 123,
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo_electronico": "juan@example.com",
  "is_active": true
}
```

**Error Response (401):**
```json
{
  "detail": "Token inválido o expirado"
}
```

#### 4. Request Password Reset

**Endpoint:** `POST /password-reset`

**Description:** Send password reset email to user

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "correo_electronico": "juan@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "Correo de recuperación enviado"
}
```

**Note:** Always returns success for security reasons, even if email doesn't exist.

#### 5. Confirm Password Reset

**Endpoint:** `POST /password-reset/confirm`

**Description:** Complete password reset with token

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "token": "reset_token_from_email",
  "new_password": "NewSecurePassword123!"
}
```

**Success Response (200):**
```json
{
  "message": "Contraseña actualizada exitosamente"
}
```

**Error Response (400):**
```json
{
  "detail": "Token inválido o expirado"
}
```

#### 6. Delete Account

**Endpoint:** `DELETE /delete`

**Description:** Permanently delete user account

**Headers:**
```
Authorization: Bearer {access_token}
```

**Success Response (200):**
```json
{
  "message": "Cuenta eliminada exitosamente"
}
```

**Error Response (401):**
```json
{
  "detail": "Usuario no autenticado"
}
```

---

## 🙏 Prayer Requests API

### Base Configuration

```typescript
const API_URL = process.env.NEXT_PUBLIC_PETICIONES_URL || "https://montesion.me/peticiones"
```

### Endpoints

#### Submit Prayer Request

**Endpoint:** `POST /peticion`

**Description:** Submit a new prayer request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "ticket": 123456,
  "nombre": "María González",
  "correo_electronico": "maria@example.com",
  "asunto": "Oración por salud",
  "peticion": "Por favor oren por la recuperación de mi familia después del accidente."
}
```

**Field Validation:**
- `nombre`: Minimum 2 characters
- `correo_electronico`: Valid email format
- `asunto`: Minimum 2 characters  
- `peticion`: Minimum 10 characters
- `ticket`: Random number for tracking

**Success Response (200):**
```json
{
  "success": true,
  "message": "Petición recibida exitosamente",
  "ticket": 123456
}
```

**Error Response (400):**
```json
{
  "detail": "Datos de entrada inválidos"
}
```

**Example:**
```typescript
const response = await fetch(`${API_URL}/peticion`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ticket: Math.floor(Math.random() * 1000000),
    nombre: "María González",
    correo_electronico: "maria@example.com",
    asunto: "Oración por salud",
    peticion: "Por favor oren por la recuperación de mi familia.",
  }),
});
```

---

## 📧 Newsletter API

### Base Configuration

```typescript
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
```

### Endpoints

#### Subscribe to Newsletter

**Endpoint:** `POST /api/send-email`

**Description:** Subscribe email to newsletter

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "suscriptor@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Suscripción exitosa"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email ya está suscrito"
}
```

---

## 🗺️ Google Maps API

### Configuration

```typescript
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
```

### Services Used

#### 1. Maps JavaScript API

**Purpose:** Display interactive maps with temple locations

**Implementation:**
```typescript
const map = new google.maps.Map(mapElement, {
  center: { lat: 17.0732, lng: -96.7266 }, // Oaxaca center
  zoom: 11,
  styles: customMapStyles
});
```

#### 2. Places API

**Purpose:** Search for locations and get detailed information

**Usage:**
- Temple location searches
- Address autocomplete
- Place details retrieval

#### 3. Distance Matrix API

**Purpose:** Calculate distances and travel times

**Implementation:**
```typescript
const service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix({
  origins: [userLocation],
  destinations: templeLocations,
  travelMode: google.maps.TravelMode.DRIVING,
  unitSystem: google.maps.UnitSystem.METRIC,
}, callback);
```

#### 4. Geocoding API

**Purpose:** Convert addresses to coordinates and vice versa

**Usage:**
- User location detection
- Address validation
- Coordinate conversion

---

## 🔒 Error Handling

### Standard Error Response Format

```json
{
  "detail": "Error message in Spanish",
  "error_code": "SPECIFIC_ERROR_CODE",
  "timestamp": "2024-12-21T10:30:00Z"
}
```

### Common HTTP Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required or failed
- **403 Forbidden**: Access denied
- **404 Not Found**: Resource not found
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

### Client-Side Error Handling

```typescript
async function apiRequest(endpoint: string, options: RequestInit) {
  try {
    const response = await fetch(endpoint, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.detail || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
```

---

## 🚦 Rate Limiting

### Current Limits

- **Authentication endpoints**: 5 requests per minute per IP
- **Prayer requests**: 3 requests per hour per IP
- **Newsletter subscription**: 1 request per minute per IP

### Rate Limit Headers

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1640995200
```

### Rate Limit Response

```json
{
  "detail": "Demasiadas solicitudes. Intenta de nuevo en unos minutos.",
  "retry_after": 60
}
```

---

## 🔧 Environment Variables

### Required Variables

```bash
# Authentication API
NEXT_PUBLIC_AUTH_URL=https://montesion-backend.onrender.com/auth

# Prayer Requests API
NEXT_PUBLIC_PETICIONES_URL=https://montesion.me/peticiones

# Newsletter/General Backend
NEXT_PUBLIC_BACKEND_URL=https://your-backend.com

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Development vs Production

```bash
# Development
NEXT_PUBLIC_AUTH_URL=http://localhost:8000/auth
NEXT_PUBLIC_PETICIONES_URL=http://localhost:8001/peticiones

# Production
NEXT_PUBLIC_AUTH_URL=https://montesion-backend.onrender.com/auth
NEXT_PUBLIC_PETICIONES_URL=https://montesion.me/peticiones
```

---

## 📊 API Monitoring

### Health Check Endpoints

```
GET /health
GET /auth/health
GET /peticiones/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-12-21T10:30:00Z",
  "version": "1.0.0"
}
```

### Monitoring Metrics

- **Response Time**: < 200ms average
- **Uptime**: 99.9% SLA
- **Error Rate**: < 0.1%
- **Throughput**: Requests per second

---

## 🧪 Testing APIs

### Unit Testing with Jest

```typescript
// Mock API responses
global.fetch = jest.fn();

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

test('should login user successfully', async () => {
  (fetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ access_token: 'fake-token' }),
  });

  const result = await login('test@test.com', 'password');
  
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('/token'),
    expect.objectContaining({
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  );
});
```

### Integration Testing

```bash
# Run API tests against staging environment
npm run test:api:staging

# Run API tests against local development
npm run test:api:local
```

---

## 📚 SDKs and Libraries

### Recommended Client Libraries

```typescript
// Authentication client
import { AuthProvider, useAuth } from '@/app/auth-context';

// Prayer requests client
import PeticionDeOracion from '@/components/ui/peticiondeoracion';

// Maps integration
import Maps from '@/components/ui/maps';
```

### Third-Party Integrations

- **Google Maps**: `@googlemaps/js-api-loader`
- **HTTP Client**: Native `fetch` API
- **Validation**: `zod` for schema validation
- **Forms**: `react-hook-form` with validation

---

## 🔄 API Versioning

### Current Version

All APIs are currently at version `v1`. Future versions will be backward compatible or properly versioned:

```
https://api.montesion.me/v1/auth/token
https://api.montesion.me/v1/peticiones/peticion
```

### Migration Guide

When new API versions are released, migration guides will be provided with:

- Breaking changes documentation
- Migration scripts
- Backward compatibility timeline
- Testing procedures

---

## 📞 Support

### API Issues

- **GitHub Issues**: Report bugs and feature requests
- **Email**: api-support@montesion.me
- **Documentation**: Always kept up-to-date
- **Status Page**: Real-time API status monitoring

### Rate Limit Increases

For higher rate limits, contact the development team with:

- Use case description
- Expected request volume
- Timeline requirements
- Technical contact information

---

**Last Updated**: December 21, 2024  
**API Version**: v1.0.0  
**Documentation Version**: 1.1.0
