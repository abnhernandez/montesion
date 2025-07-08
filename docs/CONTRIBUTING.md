# 📖 Guía de Contribución - Monte Sion

¡Gracias por tu interés en contribuir al proyecto Monte Sion! Esta guía te ayudará a empezar y contribuir de manera efectiva.

## 🚀 Primeros Pasos

### 1. Fork y Clonación

```bash
# 1. Fork el repositorio en GitHub
# 2. Clonar tu fork
git clone https://github.com/TU_USUARIO/montesion.git
cd montesion

# 3. Agregar upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/montesion.git

# 4. Verificar remotes
git remote -v
```

### 2. Configuración del Entorno

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Configurar variables locales
# Editar .env.local con tus valores de desarrollo
```

### 3. Verificar Instalación

```bash
# Ejecutar en modo desarrollo
npm run dev

# Verificar linting
npm run lint

# Ejecutar build
npm run build
```

## 📋 Tipos de Contribuciones

### 🐛 Reportar Bugs

**Antes de reportar:**
- Busca en los [issues existentes](https://github.com/usuario/montesion/issues)
- Verifica que sea reproducible
- Prueba en la última versión

**Formato del reporte:**

```markdown
## 🐛 Bug Report

### Descripción
Descripción clara y concisa del problema.

### Pasos para Reproducir
1. Ir a '...'
2. Hacer clic en '...'
3. Scroll hasta '...'
4. Ver error

### Comportamiento Esperado
Lo que esperabas que pasara.

### Comportamiento Actual
Lo que está pasando actualmente.

### Screenshots
Si aplica, agregar screenshots.

### Información del Entorno
- OS: [e.g. Windows 11, macOS 13, Ubuntu 22.04]
- Browser: [e.g. Chrome 119, Firefox 120, Safari 16]
- Device: [e.g. Desktop, iPhone 12, Samsung Galaxy S21]
- Version: [e.g. 1.0.0]

### Información Adicional
Cualquier otra información relevante.
```

### ✨ Solicitar Features

```markdown
## ✨ Feature Request

### ¿El feature está relacionado con un problema?
Descripción clara del problema. Ej: "Me frustra cuando [...]"

### Describe la solución que te gustaría
Descripción clara y concisa de lo que quieres que pase.

### Describe alternativas que hayas considerado
Descripción de soluciones o features alternativos.

### Información adicional
Cualquier otro contexto o screenshots sobre el feature request.
```

### 🔧 Contribuir Código

#### Workflow de Desarrollo

```bash
# 1. Actualizar main branch
git checkout main
git pull upstream main

# 2. Crear feature branch
git checkout -b feature/nombre-descriptivo

# 3. Hacer cambios y commits
git add .
git commit -m "feat: agregar funcionalidad de búsqueda de templos"

# 4. Push a tu fork
git push origin feature/nombre-descriptivo

# 5. Crear Pull Request en GitHub
```

#### Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Tipos de commits:
feat:     # Nueva funcionalidad
fix:      # Corrección de bug
docs:     # Cambios en documentación
style:    # Formateo, sin cambios de código
refactor: # Refactoring de código
test:     # Agregar o corregir tests
chore:    # Cambios de build, dependencias, etc.

# Ejemplos:
git commit -m "feat: agregar mapa interactivo de templos"
git commit -m "fix: corregir error de autenticación en móviles"
git commit -m "docs: actualizar README con nueva API"
git commit -m "style: formatear componentes con prettier"
git commit -m "refactor: optimizar componente MapaTemplos"
git commit -m "test: agregar tests para auth-context"
git commit -m "chore: actualizar dependencias de seguridad"
```

## 🏗️ Estándares de Código

### Estructura de Archivos

```bash
# Componentes nuevos
components/
├── ui/
│   └── nuevo-componente.tsx        # Componente base
└── NuevoComponente.tsx             # Componente de negocio

# Páginas nuevas
app/
├── nueva-seccion/
│   ├── layout.tsx                  # Layout específico
│   ├── page.tsx                    # Página principal
│   └── components/                 # Componentes específicos
```

### Convenciones de Naming

```typescript
// Componentes: PascalCase
export default function NuevoComponente() {}

// Hooks: camelCase con prefijo 'use'
export function useNuevoHook() {}

// Utilidades: camelCase
export function calcularDistancia() {}

// Constantes: SCREAMING_SNAKE_CASE
export const API_BASE_URL = 'montesion-backend.onrender.com/docs';

// Archivos: kebab-case
// nuevo-componente.tsx
// auth-context.tsx
// prayer-request.tsx
```

### TypeScript Guidelines

```typescript
// Definir interfaces para props
interface ComponenteProps {
  titulo: string;
  descripcion?: string;
  onClick: () => void;
  children?: React.ReactNode;
}

// Usar tipos específicos, no 'any'
type EstadoAutenticacion = 'loading' | 'authenticated' | 'unauthenticated';

// Exportar tipos cuando sea necesario
export interface Usuario {
  id: number;
  nombre: string;
  correo_electronico: string;
}

// Usar generics cuando aplique
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
```

### Styling Guidelines

```typescript
// Usar Tailwind CSS classes
<div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">

// Componentes complejos: extraer clases
const cardClasses = cn(
  "flex items-center justify-between p-4 rounded-lg shadow-md",
  "bg-white dark:bg-gray-900",
  "hover:shadow-lg transition-shadow duration-200"
);

// Responsive design: mobile first
<div className="w-full md:w-1/2 lg:w-1/3">

// Estados interactivos
<button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">
```

### Accesibilidad

```typescript
// ARIA labels obligatorios
<button 
  onClick={handleSubmit}
  aria-label="Enviar petición de oración"
  disabled={loading}
>
  {loading ? 'Enviando...' : 'Enviar'}
</button>

// Semantic HTML
<main>
  <section aria-labelledby="servicios-heading">
    <h2 id="servicios-heading">Nuestros Servicios</h2>
    {/* contenido */}
  </section>
</main>

// Keyboard navigation
<div 
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  onClick={handleClick}
>
```

### Error Handling

```typescript
// Try-catch para operaciones async
async function enviarPeticion(data: PeticionData) {
  try {
    setLoading(true);
    const response = await fetch('/api/peticiones', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    toast.success('Petición enviada exitosamente');
    return result;
  } catch (error) {
    console.error('Error enviando petición:', error);
    toast.error('Error al enviar petición. Intenta de nuevo.');
    throw error;
  } finally {
    setLoading(false);
  }
}

// Error boundaries para componentes
'use client';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <h2 className="text-2xl font-bold mb-4">Algo salió mal</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button 
        onClick={reset}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
```

## 🧪 Testing

### Escribir Tests

```typescript
// components/__tests__/auth-context.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../auth-context';

function TestComponent() {
  const { user, login } = useAuth();
  return (
    <div>
      <div data-testid="user-status">
        {user ? `Logged in as ${user.nombre}` : 'Not logged in'}
      </div>
      <button onClick={() => login('test@test.com', 'password')}>
        Login
      </button>
    </div>
  );
}

describe('AuthContext', () => {
  it('should handle user login', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
    
    // Mock API response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ access_token: 'fake-token' }),
    });

    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as');
    });
  });
});
```

### Ejecutar Tests

```bash
# Instalar dependencias de testing
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom

# Ejecutar tests
npm test

# Test con coverage
npm run test:coverage

# Test en watch mode
npm run test:watch
```

## 🧪 Testing Guidelines

### Configuración de Testing

```bash
# Instalar dependencias de testing
npm install --save-dev @testing-library/react @testing-library/jest-dom jest-environment-jsdom

# Configurar Jest (jest.config.js)
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
```

### Ejemplos Específicos del Proyecto

#### Testing AuthContext
```typescript
// __tests__/auth-context.test.tsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/app/auth-context';

function TestComponent() {
  const { user, login, loading } = useAuth();
  
  return (
    <div>
      <div data-testid="user-status">
        {loading ? 'Loading...' : user ? `Logged in as ${user.nombre}` : 'Not logged in'}
      </div>
      <button 
        onClick={() => login('test@montesion.me', 'TestPassword123!')}
        data-testid="login-button"
      >
        Login
      </button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
    });

    // Mock fetch
    global.fetch = jest.fn();
  });

  it('should handle user login successfully', async () => {
    // Mock successful login response
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ access_token: 'fake-token' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          id: 1,
          nombre: 'Juan',
          apellido: 'Pérez',
          correo_electronico: 'test@montesion.me',
          is_active: true,
        }),
      });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user-status')).toHaveTextContent('Loading...');

    // Wait for initial load to complete
    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
    });

    // Click login button
    fireEvent.click(screen.getByTestId('login-button'));

    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as Juan');
    });

    // Verify API calls
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/token'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
    );
  });

  it('should handle login errors', async () => {
    // Mock failed login response
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Credenciales inválidas'));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
    });
  });
});
```

#### Testing Peticiones de Oración
```typescript
// __tests__/peticion-oracion.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PeticionDeOracion from '@/components/ui/peticiondeoracion';

describe('PeticionDeOracion', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    process.env.NEXT_PUBLIC_PETICIONES_URL = 'https://test-api.com';
  });

  it('should validate form fields correctly', async () => {
    render(<PeticionDeOracion />);

    const nombreInput = screen.getByPlaceholderText('Nombre');
    const emailInput = screen.getByPlaceholderText('Correo electrónico');
    const submitButton = screen.getByText('Enviar');

    // Test empty validation
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/corrige los errores/i)).toBeInTheDocument();
    });

    // Test email validation
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
      expect(screen.getByText(/verifica este dato/i)).toBeInTheDocument();
    });

    // Test valid input
    fireEvent.change(nombreInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@test.com' } });
    
    await waitFor(() => {
      expect(screen.queryByText(/verifica este dato/i)).not.toBeInTheDocument();
    });
  });

  it('should submit form successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<PeticionDeOracion />);

    // Fill form
    fireEvent.change(screen.getByPlaceholderText('Nombre'), { 
      target: { value: 'Juan Pérez' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), { 
      target: { value: 'juan@test.com' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Asunto'), { 
      target: { value: 'Mi petición' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Describe tu petición'), { 
      target: { value: 'Por favor oren por mi familia' } 
    });

    // Submit form
    fireEvent.click(screen.getByText('Enviar'));

    await waitFor(() => {
      expect(screen.getByText(/petición enviada con éxito/i)).toBeInTheDocument();
    });

    // Verify API call
    expect(global.fetch).toHaveBeenCalledWith(
      'https://test-api.com/peticion',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('juan@test.com'),
      })
    );
  });
});
```

#### Testing Navigation Component
```typescript
// __tests__/navegacion.test.tsx
import { render, screen } from '@testing-library/react';
import BarradeNavegacion from '@/components/BarradeNavegacion';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
}));

describe('BarradeNavegacion', () => {
  it('should render navigation links', () => {
    render(<BarradeNavegacion />);

    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Templos')).toBeInTheDocument();
    expect(screen.getByText('Oración')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('should highlight current page', () => {
    render(<BarradeNavegacion />);
    
    const homeLink = screen.getByText('Inicio').closest('a');
    expect(homeLink).toHaveClass('text-primary'); // o la clase que uses para active
  });
});
```

### E2E Testing con Playwright

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should allow user to sign up and login', async ({ page }) => {
    // Go to signup page
    await page.goto('/users/sign_up');

    // Fill signup form
    await page.fill('[placeholder="Nombre"]', 'Juan');
    await page.fill('[placeholder="Apellido"]', 'Pérez');
    await page.fill('[placeholder="Correo electrónico"]', 'juan.test@montesion.me');
    await page.fill('[placeholder="Contraseña"]', 'TestPassword123!');

    // Submit form
    await page.click('button[type="submit"]');

    // Should redirect to dashboard or home
    await expect(page).toHaveURL('/dashboard');

    // Logout
    await page.click('[data-testid="logout-button"]');

    // Should redirect to home
    await expect(page).toHaveURL('/');
  });

  test('should handle login errors gracefully', async ({ page }) => {
    await page.goto('/users/sign_in');

    // Try invalid credentials
    await page.fill('[placeholder="Correo electrónico"]', 'invalid@test.com');
    await page.fill('[placeholder="Contraseña"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Should show error message
    await expect(page.getByText(/credenciales inválidas/i)).toBeVisible();
  });
});

test.describe('Prayer Requests', () => {
  test('should submit prayer request successfully', async ({ page }) => {
    await page.goto('/oracion');

    // Fill prayer request form
    await page.fill('[placeholder="Nombre"]', 'María López');
    await page.fill('[placeholder="Correo electrónico"]', 'maria@test.com');
    await page.fill('[placeholder="Asunto"]', 'Oración por salud');
    await page.fill('[placeholder="Describe tu petición"]', 'Por favor oren por la recuperación de mi familia');

    // Submit form
    await page.click('button[type="submit"]');

    // Should show success message
    await expect(page.getByText(/petición enviada con éxito/i)).toBeVisible();
  });
});
```

### Performance Testing

```typescript
// __tests__/performance.test.ts
import { render } from '@testing-library/react';
import { performance } from 'perf_hooks';
import HomePage from '@/app/page';

describe('Performance Tests', () => {
  it('should render HomePage within performance budget', () => {
    const startTime = performance.now();
    
    render(<HomePage />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Homepage should render in under 100ms
    expect(renderTime).toBeLessThan(100);
  });

  it('should have acceptable bundle size', async () => {
    // This would typically be run in CI/CD
    const bundleAnalyzer = await import('webpack-bundle-analyzer');
    // Add bundle size assertions
  });
});
```

## 📱 Componentes UI

### Crear Nuevo Componente

```typescript
// components/ui/nuevo-boton.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const botonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BotonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof botonVariants> {
  asChild?: boolean;
}

const Boton = React.forwardRef<HTMLButtonElement, BotonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(botonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Boton.displayName = "Boton";

export { Boton, botonVariants };
```

### Documentar Componente

```typescript
// components/ui/nuevo-boton.stories.tsx (si usas Storybook)
import type { Meta, StoryObj } from '@storybook/react';
import { Boton } from './nuevo-boton';

const meta: Meta<typeof Boton> = {
  title: 'UI/Boton',
  component: Boton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Botón',
  },
};

export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Botón Primario',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Botón Secundario',
  },
};
```

## 🔄 Pull Request Process

### Checklist antes de PR

- [ ] ✅ **Código funciona** en local
- [ ] 🧹 **Linting** pasa sin errores (`npm run lint`)
- [ ] 🏗️ **Build** exitoso (`npm run build`)
- [ ] 📱 **Responsive** en móvil y desktop
- [ ] ♿ **Accesibilidad** verificada
- [ ] 🎨 **UI consistente** con design system
- [ ] 📝 **Commits** siguen convenciones
- [ ] 🧪 **Tests** agregados si aplica
- [ ] 📖 **Documentación** actualizada

### Template de Pull Request

```markdown
## 📝 Descripción

Breve descripción de los cambios realizados.

## 🔗 Issue Relacionado

Fixes #(issue number)

## 🧪 Tipo de Cambio

- [ ] 🐛 Bug fix (cambio que corrige un issue)
- [ ] ✨ Nueva feature (cambio que agrega funcionalidad)
- [ ] 💥 Breaking change (fix o feature que causa que funcionalidad existente no funcione como esperado)
- [ ] 📝 Documentación (cambios solo en documentación)

## 🧪 Testing

Describe las pruebas que realizaste para verificar tus cambios:

- [ ] Pruebas unitarias
- [ ] Pruebas de integración
- [ ] Pruebas manuales

## 📱 Screenshots

Si aplica, agregar screenshots de los cambios UI:

| Antes | Después |
|-------|---------|
| <img src="before.png" width="300"> | <img src="after.png" width="300"> |

## ✅ Checklist

- [ ] Mi código sigue las convenciones del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado mi código en áreas complejas
- [ ] He actualizado la documentación correspondiente
- [ ] Mis cambios no generan nuevos warnings
- [ ] He agregado tests que prueban que mi fix es efectivo o que mi feature funciona
- [ ] Los tests nuevos y existentes pasan localmente
- [ ] Cualquier cambio dependiente ha sido mergeado y publicado
```

### Proceso de Review

1. **Automated Checks**: GitHub Actions ejecuta linting, build y tests
2. **Code Review**: Al menos un maintainer debe aprobar
3. **Testing**: Reviewer prueba cambios en preview deployment
4. **Merge**: Squash and merge preferred para mantener historia limpia

## 🎯 Áreas de Contribución

### 🎨 Frontend/UI

**Prioridades:**
- Mejorar accesibilidad
- Optimizar performance
- Responsive design
- Animaciones fluidas
- Dark mode consistency

**Skills necesarios:**
- React/Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

### 🔧 Backend/API

**Prioridades:**
- Optimizar queries de BD
- Mejorar seguridad
- Agregar rate limiting
- Logging y monitoring
- Cache strategies

**Skills necesarios:**
- FastAPI/Python
- PostgreSQL
- JWT/OAuth
- REST APIs

### 📱 Mobile/PWA

**Prioridades:**
- Progressive Web App features
- Offline functionality
- Push notifications
- App-like interactions

**Skills necesarios:**
- PWA technologies
- Service Workers
- Web APIs

### 📖 Documentación

**Prioridades:**
- API documentation
- User guides
- Developer onboarding
- Code documentation

**Skills necesarios:**
- Technical writing
- Markdown
- API documentation tools

### 🧪 Testing

**Prioridades:**
- Unit tests
- Integration tests
- E2E tests
- Performance tests

**Skills necesarios:**
- Jest/Testing Library
- Playwright/Cypress
- Performance testing

## 🌟 Reconocimiento

### Contributors

Todos los contributors son reconocidos en:
- README.md contributors section
- GitHub contributors page
- Changelog releases

### Tipos de Contribución

Reconocemos diferentes tipos de contribución usando [All Contributors](https://allcontributors.org/):

- 💻 **Code** - Contribuciones de código
- 📖 **Documentation** - Documentación
- 🐛 **Bug reports** - Reportes de bugs
- 💡 **Ideas** - Ideas y sugerencias
- 🎨 **Design** - Diseño
- 💬 **Answering Questions** - Responder preguntas
- 🧑‍🏫 **Mentoring** - Mentoring nuevos contributors

## 🤝 Código de Conducta

### Nuestro Compromiso

Como miembros, contribuidores y administradores de este proyecto, nos comprometemos a hacer de la participación en nuestra comunidad una experiencia libre de acoso para todos.

### Estándares

Ejemplos de comportamiento que contribuyen a crear un ambiente positivo:

- ✅ Usar lenguaje acogedor e inclusivo
- ✅ Respetar diferentes puntos de vista y experiencias
- ✅ Aceptar críticas constructivas con gracia
- ✅ Enfocarse en lo que es mejor para la comunidad
- ✅ Mostrar empatía hacia otros miembros

Ejemplos de comportamiento inaceptable:

- ❌ Uso de lenguaje o imágenes sexualizadas
- ❌ Comentarios insultantes/despectivos
- ❌ Acoso público o privado
- ❌ Publicar información privada sin permiso
- ❌ Conducta que podría considerarse inapropiada en un entorno profesional

### Aplicación

Los casos de comportamiento abusivo, acosador o inaceptable pueden ser reportados contactando al equipo del proyecto en: [email de contacto].

## 📞 Obtener Ayuda

### Canales de Comunicación

- **🐛 Bugs & Issues**: [GitHub Issues](https://github.com/usuario/montesion/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/usuario/montesion/discussions)
- **❓ Questions**: [GitHub Discussions Q&A](https://github.com/usuario/montesion/discussions/categories/q-a)
- **📧 Email**: montesion.dev@gmail.com
- **💬 Discord**: [Server invite link]

### Mentorship

¿Nuevo contribuyendo a open source? ¡Te ayudamos!

- Busca issues etiquetados como `good first issue`
- Menciona que eres nuevo en tu primer PR
- Los maintainers te guiarán durante el proceso

### Recursos Útiles

- [First Contributions](https://github.com/firstcontributions/first-contributions)
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)

---

¡Gracias por contribuir a Monte Sion! Tu participación ayuda a construir una mejor experiencia digital para nuestra comunidad. 🙏
