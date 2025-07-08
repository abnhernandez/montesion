# 🏛️ Monte Sion - Iglesia Cristiana

Una plataforma web moderna y completa para la Iglesia Cristiana Monte Sion, desarrollada con Next.js 15, diseñada para conectar a la comunidad cristiana y facilitar el crecimiento espiritual.

![Monte Sion Banner](https://img.shields.io/badge/Monte%20Sion-Iglesia%20Cristiana-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Características Principales

### 🎯 **Experiencia de Usuario Integral**
- **Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- **Modo Oscuro/Claro**: Soporte completo para preferencias del usuario
- **Animaciones Fluidas**: Implementadas con Framer Motion y GSAP
- **Accesibilidad**: Cumple con estándares WCAG para inclusión digital

### ⛪ **Funcionalidades del sitio web**
- **Sistema de Autenticación**: Registro, login y gestión de usuarios
- **Localizador de Templos**: Mapa interactivo con Google Maps para encontrar ubicaciones
- **Peticiones de Oración**: Sistema de envío y gestión de solicitudes espirituales
- **Planificación de Visitas**: Herramientas para que nuevos visitantes se integren
- **Declaraciones de Fe**: Documentación teológica interactiva con referencias bíblicas

### 📚 **Recursos Espirituales**
- **Biblia Integrada**: Visor en línea de Bible.com
- **Proceso de Discipulado**: Sistema de 7 pasos para crecimiento espiritual
- **Talleres y Cursos**: Registro y gestión de actividades educativas
- **Ministerios Especializados**: Secciones para mujeres, niños y jóvenes

### 🎨 **Funcionalidades Técnicas Avanzadas**
- **MetaBalls Animados**: Efectos visuales 3D con WebGL/OGL
- **SEO Optimizado**: Meta tags, sitemap.xml, robots.txt y Open Graph
- **PWA Ready**: Optimizado para instalación como aplicación web
- **Performance**: Integración con Vercel Speed Insights

## 🚀 Tecnologías Utilizadas

### **Frontend Framework**
- **Next.js 15.3.4** - React framework con App Router
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript 5** - Tipado estático para JavaScript

### **Styling & UI**
- **Tailwind CSS 4** - Framework de utilidades CSS
- **Radix UI** - Componentes accesibles y personalizables
- **Framer Motion 12** - Animaciones y transiciones
- **GSAP 3** - Animaciones avanzadas
- **Lucide React** - Iconografía moderna

### **Mapas & Geolocalización**
- **Google Maps API** - Mapas interactivos
- **React Google Maps API** - Integración con React
- **Leaflet** - Mapas alternativos lightweight

### **Autenticación & Backend**
- **Sistema de Auth Custom** - JWT tokens
- **Neon Database** - PostgreSQL serverless
- **Axios** - Cliente HTTP para APIs

### **Utilidades & Herramientas**
- **Zod** - Validación de esquemas
- **Class Variance Authority** - Gestión de variantes CSS
- **React Hot Toast** - Notificaciones elegantes
- **Next Themes** - Gestión de temas claro/oscuro

## 📁 Estructura del Proyecto

```
montesion/
├── app/                          # App Router de Next.js 15
│   ├── auth-context.tsx         # Context de autenticación
│   ├── globals.css              # Estilos globales
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página de inicio
│   ├── loading.tsx              # Componente de carga
│   ├── not-found.tsx            # Página 404
│   ├── error.tsx                # Página de error
│   │
│   ├── users/                   # Sistema de usuarios
│   │   ├── sign_in/            # Inicio de sesión
│   │   ├── sign_up/            # Registro
│   │   ├── password/           # Recuperación de contraseña
│   │   └── reset_password/     # Reset de contraseña
│   │
│   ├── templos/                # Localizador de templos
│   ├── oracion/                # Peticiones de oración
│   ├── planifica-visita/       # Planificación de visitas
│   ├── declaraciondefe/        # Declaraciones de fe
│   ├── nuestra-mision-vison/   # Misión y visión
│   ├── talleres/               # Talleres educativos
│   │   └── pintura/           # Taller de pintura para niños
│   ├── mujeres/               # Ministerio de mujeres
│   ├── kids/                  # Ministerio infantil
│   ├── courses/               # Cursos en línea
│   ├── contact/               # Contacto
│   ├── donativos/            # Donaciones
│   ├── faq/                  # Preguntas frecuentes
│   ├── links/                # Enlaces útiles
│   ├── lemuelacosta/         # Información pastoral
│   ├── primerpaso/           # Primer paso espiritual
│   ├── experiencia/          # Experiencia Monte Sion
│   ├── conduct/              # Código de conducta
│   ├── feedback/             # Retroalimentación
│   ├── terms/                # Términos y condiciones
│   ├── privacy/              # Política de privacidad
│   ├── campus-online/        # Campus virtual
│   ├── presentation/         # Presentaciones
│   ├── proximamente/         # Próximamente
│   ├── events/               # Eventos
│   ├── perfil/               # Perfil de usuario
│   ├── test/                 # Página de pruebas
│   └── 7-91/                 # Salmo 91
│
├── components/                   # Componentes reutilizables
│   ├── BarradeNavegacion.tsx   # Navegación principal
│   ├── Footer.tsx              # Pie de página
│   ├── FooterSocialIcons.tsx   # Iconos sociales
│   ├── MapaTemplos.tsx         # Mapa de templos
│   ├── TemploCard.tsx          # Tarjeta de templo
│   │
│   └── ui/                     # Componentes UI base
│       ├── accordion.tsx       # Acordeón
│       ├── alert.tsx           # Alertas
│       ├── avatar.tsx          # Avatar de usuario
│       ├── badge.tsx           # Insignias
│       ├── button.tsx          # Botones
│       ├── card.tsx            # Tarjetas
│       ├── checkbox.tsx        # Casillas de verificación
│       ├── dialog.tsx          # Diálogos modales
│       ├── input.tsx           # Campos de entrada
│       ├── label.tsx           # Etiquetas
│       ├── progress.tsx        # Barras de progreso
│       ├── radio-group.tsx     # Grupos de radio
│       ├── scroll-area.tsx     # Áreas de scroll
│       ├── hero.tsx            # Sección hero
│       ├── maps.tsx            # Componente de mapas
│       ├── acercade.tsx        # Sección sobre nosotros
│       ├── BlurText.tsx        # Texto con efecto blur
│       ├── CircularText.tsx    # Texto circular
│       ├── CTASection.tsx      # Sección de llamada a la acción
│       ├── discipleshipIcons.tsx # Iconos de discipulado
│       ├── MetaBalls.tsx       # Efectos WebGL
│       ├── PixelCard.tsx       # Tarjetas con efectos pixel
│       ├── AnimationCarruselLetras.tsx # Carrusel animado
│       ├── AnimacionCarruselLetrasFE.tsx # Carrusel frontend
│       ├── peticiondeoracion.tsx # Formulario de oración
│       ├── presentacion-para-pedir-oracion.tsx # Presentación de oración
│       ├── reseñas.tsx         # Reseñas y testimonios
│       ├── Servicios.tsx       # Servicios de la iglesia
│       └── location-permission-dialog.tsx # Diálogo de permisos
│
├── hooks/                       # Custom hooks
│   ├── use-event-banner.tsx    # Hook para banners de eventos
│   ├── use-locale.tsx          # Hook de localización
│   └── use-mobile.tsx          # Hook para detectar móvil
│
├── lib/                        # Utilidades y configuraciones
│   └── utils.ts                # Funciones utilitarias
│
├── public/                     # Archivos estáticos
│   ├── assets/                 # Imágenes y recursos
│   ├── audio/                  # Archivos de audio
│   ├── favicon.ico             # Icono del sitio
│   ├── robots.txt              # Configuración para bots
│   └── sitemap.xml             # Mapa del sitio
│
├── package.json                # Dependencias del proyecto
├── next.config.ts              # Configuración de Next.js
├── tailwind.config.js          # Configuración de Tailwind
├── tsconfig.json               # Configuración de TypeScript
├── postcss.config.mjs          # Configuración de PostCSS
├── eslint.config.mjs           # Configuración de ESLint
└── components.json             # Configuración de componentes UI
```

## 🛠️ Instalación y Configuración

### **Prerrequisitos**
- Node.js 18+ 
- npm, yarn, pnpm o bun
- Cuenta de Google Cloud (para Google Maps API)
- Base de datos PostgreSQL (recomendado Neon)

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/usuario/montesion.git
cd montesion
```

### **2. Instalar Dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

### **3. Configurar Variables de Entorno**
Crear archivo `.env.local`:
```bash
# Autenticación
NEXT_PUBLIC_AUTH_URL=montesion-backend.onrender.com/auth
NEXT_PUBLIC_BACKEND_URL=montesion-backend.onrender.com/docs

# APIs
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=false
NEXT_PUBLIC_PETICIONES_URL=montesion-backend.onrender.com/peticiones

# Base de datos
DATABASE_URL=postgresql://usuario:password@host:puerto/database

# Otros
NEXT_PUBLIC_SITE_URL=https://montesion.me
```

### **4. Ejecutar en Desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

### **5. Build para Producción**
```bash
npm run build
npm start
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo con Turbopack
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

## 🌐 URLs y Deployment

### **Dominios Activos**
- **Producción**: https://montesion.me
- **Staging**: https://montesion.vercel.app

### **Deployment**
El proyecto está configurado para deployment automático en Vercel:
- Push a `main` → Deploy a producción
- Pull requests → Preview deployments

## 📱 Rutas Principales

### **Públicas**
- `/` - Página de inicio
- `/planifica-visita` - Planificación de visitas
- `/templos` - Localizador de templos
- `/oracion` - Peticiones de oración
- `/nuestra-mision-vison` - Misión y visión
- `/declaraciondefe` - Declaraciones de fe
- `/talleres/pintura` - Taller de pintura infantil
- `/contact` - Contacto
- `/faq` - Preguntas frecuentes

### **Autenticadas**
- `/users/sign_in` - Inicio de sesión
- `/users/sign_up` - Registro
- `/perfil` - Perfil de usuario
- `/dashboard` - Panel de usuario

### **Ministerios**
- `/mujeres` - Ministerio de mujeres
- `/kids` - Ministerio infantil
- `/courses` - Cursos en línea
- `/primerpaso` - Primer paso espiritual

## 🎨 Sistema de Diseño

### **Colores**
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --primary: #831111;
  --muted: #f5f5f5;
  --border: #e5e5e5;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### **Tipografía**
- **Principal**: Lexend (sans-serif)
- **Monospace**: Geist Mono
- **Pesos**: 400 (Regular), 500 (Medium), 600 (SemiBold)

### **Breakpoints**
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 🔒 Autenticación

### **Sistema de Auth**
- **JWT Tokens** para sesiones
- **Registro con email/password**
- **Recuperación de contraseña**
- **Validación de formularios con Zod**

### **Endpoints del Backend**
```typescript
// Rutas de autenticación
POST /auth/register     // Registro
POST /auth/token        // Login
GET  /auth/auth         // Verificar usuario
POST /auth/password-reset // Solicitar reset
POST /auth/password-reset/confirm // Confirmar reset
DELETE /auth/delete     // Eliminar cuenta
```

## 🗺️ Integración de Mapas

### **Google Maps**
- **Componente MapaTemplos**: Mapa interactivo de ubicaciones
- **Marcadores personalizados**: Con información de templos
- **Geolocalización**: Detección automática de ubicación del usuario
- **Responsive**: Adaptado para móviles y desktop

### **Características**
- Búsqueda de templos por nombre, dirección o código postal
- Cálculo de distancias
- Enlaces directos a Google Maps
- Información de contacto y horarios

## 📧 Sistema de Peticiones de Oración

### **Funcionalidades**
- **Formulario validado**: Con Zod schema validation
- **Campos requeridos**: Nombre, email, asunto, petición
- **Envío asíncrono**: Con feedback visual
- **Privacidad**: Política clara de manejo de datos

### **API Endpoint**
```typescript
POST /peticiones/peticion
{
  ticket: number,
  nombre: string,
  correo_electronico: string,
  asunto: string,
  peticion: string
}
```

## 🎓 Sistema de Discipulado

### **7 Pasos del Crecimiento Espiritual**
1. **Nuevos Creyentes** - Decisión por Cristo
2. **Bautismo en Agua** - Compromiso público
3. **Fundamentos de la Fe** - Conocimiento bíblico
4. **Vida en Comunidad** - Conexión con otros creyentes
5. **Descubriendo tu Propósito** - Llamado personal
6. **Servicio y Ministerio** - Participación activa
7. **Liderazgo y Multiplicación** - Formar a otros

Cada paso incluye:
- **Descripción detallada**
- **Versículos bíblicos relevantes**
- **Enlaces a Bible.com**
- **Iconografía específica**

## 🎨 Efectos Visuales Avanzados

### **MetaBalls WebGL**
- **Renderizado 3D**: Con biblioteca OGL
- **Interactividad**: Responde al movimiento del mouse
- **Configurable**: Múltiples parámetros ajustables
- **Performance**: Optimizado para diferentes dispositivos

### **Animaciones**
- **Framer Motion**: Para transiciones de página y componentes
- **GSAP**: Para animaciones complejas
- **CSS Animations**: Para efectos ligeros
- **React Spring**: Para animaciones físicas

## 📊 SEO y Performance

### **Optimización SEO**
- **Meta tags** dinámicos por página
- **Open Graph** para redes sociales
- **Sitemap.xml** generado automáticamente
- **Robots.txt** configurado
- **URLs canónicas** para evitar contenido duplicado

### **Performance**
- **Next.js Image** para optimización de imágenes
- **Dynamic imports** para code splitting
- **Vercel Speed Insights** integrado
- **Lighthouse scores** optimizados

## 🧪 Testing y Quality

### **Linting**
- **ESLint** con configuración de Next.js
- **TypeScript** para tipado estático
- **Prettier** para formateo consistente

### **Accesibilidad**
- **ARIA labels** en componentes interactivos
- **Keyboard navigation** completa
- **Screen reader** compatible
- **Color contrast** WCAG AA

## 🚀 Próximas Funcionalidades

### **En Desarrollo**
- [ ] **Dashboard de Usuario** - Panel personalizado
- [ ] **Sistema de Eventos** - Calendario y inscripciones
- [ ] **Campus Online** - Plataforma de aprendizaje
- [ ] **Notificaciones Push** - Alertas en tiempo real
- [ ] **Streaming en Vivo** - Transmisiones de servicios con Apoyo del Software de YouVersion Church
- [ ] **Donaciones Online** - Integración con pasarelas de pago

### **Mejoras Planificadas**
- [ ] **Optimización de Imágenes** - WebP y AVIF
- [ ] **PWA Completa** - Funcionalidad offline
- [ ] **Internacionalización** - Múltiples idiomas
- [ ] **Analytics Avanzados** - Métricas detalladas
- [ ] **A/B Testing** - Optimización de conversiones

## 🤝 Contribución

### **Cómo Contribuir**
1. Fork el repositorio
2. Crear branch para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### **Estándares de Código**
- Usar TypeScript para tipado
- Seguir convenciones de Next.js
- Implementar tests para nuevas funcionalidades
- Documentar componentes complejos
- Mantener accesibilidad web

## 📞 Contacto y Soporte


- **Email**: abnerhernandez.x@gmail.com

### **Desarrollo Técnico**
- **Issues**: Reportar bugs o solicitar features
- **Discussions**: Preguntas y propuestas
- **Email técnico**: abnerhernandez.x@gmail.com

## 📄 Licencia

Este proyecto es desarrollado y gestionado por Abner Daniel Hernández Ruiz, estudiante de Código Facilito como forma de demostrar lo aprendiendo en el Bootcamp de Redes e Infraestructura para Frontends.
Todos los derechos reservados.

---

<div align="center">

**🙏 "Donde está el Espíritu del Señor, allí hay libertad" - 2 Corintios 3:17**

*Desarrollado con ❤️ para la comunidad Monte Sion*

</div>
