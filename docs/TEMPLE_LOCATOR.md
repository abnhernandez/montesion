# 🗺️ Sistema de Localización de Templos - Monte Sion

Este documento explica la implementación del sistema de mapas interactivo para localizar los templos de la Iglesia Cristiana Monte Sion.

## 🎯 Características Implementadas

### 1. **Localizador Simple (Actual)**
- **Componente**: `SimpleTempleLocator.tsx`
- **Funcionalidad**: Panel de información + iframe de Google Maps
- **Ventajas**: Fácil de implementar, no requiere API key
- **Ubicado en**: `components/ui/SimpleTempleLocator.tsx`

### 2. **Localizador Avanzado (Google Extended Components)**
- **Componente**: `TempleLocator.tsx`
- **Funcionalidad**: Google Maps Extended Component Library
- **Ventajas**: Funcionalidades avanzadas, mejor UX
- **Requiere**: API Key de Google Maps
- **Ubicado en**: `components/ui/TempleLocator.tsx`

## 🏛️ Ubicaciones Configuradas

### Templo Principal
- **Nombre**: Iglesia Cristiana Monte Sion - Santa María Atzompa, Oaxaca
- **Dirección**: Cuicatlán 184, Colonia Niños Héroes, Oaxaca de Juárez, Oax., Mexico
- **Coordenadas**: 17.0776603, -96.7621633
- **Place ID**: ChIJo7B-1_sZx4UR9BS_VW2hgAE

### Confraternidad
- **Nombre**: Confraternidad Más que Vencedores · Monte Sion
- **Dirección**: Carretera Internacional, Oaxaca de Juárez, Oax., Mexico
- **Coordenadas**: 17.0911843, -96.7470356
- **Place ID**: ChIJ-d1SEWIfx4URpN6xYNkUOJQ

## 🚀 Uso Actual en la Landing Page

El mapa está integrado en la página principal (`app/page.tsx`) en la sección final:

```tsx
<section className="w-full max-w-6xl mx-auto px-2 py-14 flex flex-col items-center">
  <div className="w-full max-w-2xl mx-auto mb-6">
    <h3 className="text-3xl font-semibold text-center mb-4">
      Te esperamos en Monte Sion ❤️
    </h3>
  </div>
  <div className="flex-1 w-full h-[350px] rounded-3xl overflow-hidden shadow-2xl border border-border bg-background">
    <Maps />
  </div>
</section>
```

## ⚙️ Configuración para Localizador Avanzado

### 1. Obtener API Key de Google Maps

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita las siguientes APIs:
   - Maps JavaScript API
   - Places API
   - Directions API
   - Distance Matrix API

### 2. Configurar Variables de Entorno

Agrega a tu archivo `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

### 3. Activar el Localizador Avanzado

Cambia en `components/ui/maps.tsx`:

```tsx
import TempleLocator from './TempleLocator';

export default function HomePage() {
  return (
    <>
      <section className="w-full h-full">
        <TempleLocator className="w-full h-full min-h-[500px]" />
      </section>
    </>
  );
}
```

## 🎨 Personalización de Tema

### Localizador Simple
El tema se personaliza automáticamente con las variables CSS de Tailwind:
- Modo claro/oscuro automático
- Colores primarios del brand
- Tipografía consistente

### Localizador Avanzado
Variables CSS personalizables:

```css
--gmpx-color-surface: #ffffff;
--gmpx-color-on-surface: #1a1a1a;
--gmpx-color-primary: #2563eb;
--gmpx-font-family-base: "Inter", "Roboto", sans-serif;
```

## 🔧 Funcionalidades Disponibles

### Localizador Simple
- ✅ Cambio entre ubicaciones
- ✅ Botón "Cómo llegar" (abre Google Maps)
- ✅ Información de contacto
- ✅ Diseño responsive
- ✅ Modo oscuro/claro
- ✅ Animaciones con Framer Motion

### Localizador Avanzado (cuando se configure API)
- ✅ Búsqueda de ubicaciones
- ✅ Autocompletado de direcciones
- ✅ Direcciones paso a paso
- ✅ Matriz de distancias
- ✅ Detalles de lugares
- ✅ Controles de mapa completos

## 📱 Responsive Design

Ambos componentes están optimizados para:
- **Mobile**: Panel de información arriba, mapa abajo
- **Desktop**: Panel lateral izquierdo, mapa a la derecha
- **Tablet**: Diseño adaptable según orientación

## 🚀 Próximas Mejoras

1. **Integración con horarios de servicio**
2. **Información sobre estacionamiento**
3. **Fotos de los templos**
4. **Eventos próximos por ubicación**
5. **Reserva de visitas**
6. **Integración con transporte público**

## 🔗 Enlaces Útiles

- [Google Maps Extended Component Library](https://github.com/googlemaps/extended-component-library)
- [Google Maps Platform](https://developers.google.com/maps)
- [Documentación de APIs](https://developers.google.com/maps/documentation)

## 📄 Archivos Relacionados

- `components/ui/SimpleTempleLocator.tsx` - Localizador actual
- `components/ui/TempleLocator.tsx` - Localizador avanzado
- `components/ui/maps.tsx` - Wrapper del mapa
- `types/google-maps-extended.d.ts` - Tipos de TypeScript
- `app/page.tsx` - Integración en landing page
