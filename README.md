# LogiTrack Express — Terminal Híbrida Reactiva y Accesible (Ionic 8 + Angular Standalone)

Proyecto de referencia docente para la **Actividad 2** del módulo **Desarrollo de Interfaces (0488)** — 2º CFGS DAM.

## Arquitectura y Cumplimiento de Tareas

1. **Tarea 1 (Andamiaje, Standalone & Modelo):**
   - Proyecto sin `NgModule` arrancado con `bootstrapApplication` y `provideIonicAngular()`.
   - `tsconfig.json` con `"strict": true` y `strictTemplates: true`.
   - Modelo de dominio en `src/app/models/package.model.ts` y estado inmutable con Signals en `src/app/services/package.service.ts`.
2. **Tarea 2 (Vista Declarativa y Data Binding):**
   - `src/app/home/home.page.html` con `ion-header`, `ion-searchbar`, `ion-segment`, `ion-list` + `ion-item-sliding`.
   - Control de flujo moderno (`@for ... track pkg.id`, `@if`, `@empty`) y registro explícito de iconos (`addIcons`) para consola limpia de *warnings*.
3. **Tarea 3 (Componente Visual Reutilizable):**
   - `src/app/components/package-card/` totalmente desacoplado de `PackageService`.
   - Contrato reactivo con `input.required<WarehousePackage>()` y `output<PackageStatusChangeEvent>()`.
4. **Tarea 4 (Accesibilidad WCAG 2.1 AA y Ergonomía Industrial):**
   - Tema oscuro de alto contraste (> 7:1 en badges y botones) para entornos de baja luminosidad.
   - Botones táctiles >= 48px, `aria-label` descriptivos, `aria-hidden="true"` en iconos decorativos, `aria-live="polite"` y `:focus-visible`.
5. **Tarea 5 (Auditoría Crítica de IA y Refactorización Reactiva):**
   - Filtrado reactivo mediante Signals (`searchTerm`, `selectedPriority`) y `computed()` con `[debounce]="250"` nativo, eliminando suscripciones manuales y fugas de memoria.
   - Incluye el documento de apoyo docente `docs/TAREA5_AUDITORIA_IA.md`.

## Producción

- **App desplegada:** <https://logitrack-express.vercel.app>
- **Memoria técnica:** `docs/Memoria_LogiTrack_Express.pdf` (fuente: `docs/memoria.html`, capturas en `docs/capturas/`)

## Auditoría del código de partida (correcciones aplicadas)

Probado en navegador a 360, 820 y 1280 px. Se corrigieron tres fallos:

| Fallo | Causa | Corrección |
|---|---|---|
| "Limpiar filtros" borraba las inspecciones hechas | El botón llamaba a `resetDemo()`, que también restaura los datos | Nuevo `clearFilters()` que solo limpia `searchTerm` y `selectedPriority` |
| El segmento activo no se leía (contraste ≈ 1,3:1) | `--color-checked` oscuro, pero en modo `md` el indicador es solo una línea | `--background-checked: #38bdf8` (contraste > 7:1) |
| "Estándar" truncado a 360 px | `min-width: 90px` por defecto en `ion-segment-button` | `min-width: 0` y menos relleno lateral |

`vercel.json` declara además `outputDirectory: "www"` y el comando de build. Así no hay que configurarlos a mano en el panel de Vercel.

## Puesta en marcha local

```bash
npm install
npx ionic serve
# o alternativamente:
npm start
```

## Despliegue en Vercel

1. Sube este repositorio a GitHub.
2. Impórtalo en [Vercel](https://vercel.com).
3. Configuración recomendada:
   - **Build Command:** `npm run build`
   - **Output Directory:** `www`
   - El archivo `vercel.json` incluido gestiona automáticamente el enrutamiento SPA.
