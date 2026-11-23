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
