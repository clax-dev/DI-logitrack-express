# Material de Apoyo en Clase — Tarea 5: Auditoría Crítica de IA

## 1. Ejemplo típico de código vulnerable generado por IA (RxJS sin limpieza)

```typescript
// ❌ ANTI-PATRÓN FRECUENTE DE IA
searchSubject = new Subject<any>(); // 1. Uso de 'any'
filteredList: any[] = [];

ngOnInit() {
  // 2. Memory Leak: suscripción manual nunca cancelada al destruir el componente
  this.searchSubject.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((term) => of(this.service.filter(term))) // 3. switchMap innecesario en datos síncronos locales
  ).subscribe((res) => {
    this.filteredList = res;
  });
}

onSearch(event: any) { // 4. Evento sin tipar
  this.searchSubject.next(event.target.value);
}
```

## 2. Solución Refactorizada en este Proyecto (`home.page.ts`)

- **Cero fugas de memoria:** Uso de `signal()` + `computed()` sin ninguna llamada manual a `.subscribe()`.
- **Tipado estricto:** `IonSearchbarCustomEvent<SearchbarInputEventDetail>` en lugar de `any`.
- **Rendimiento:** `ChangeDetectionStrategy.OnPush` y `[debounce]="250"` nativo del componente `ion-searchbar`.
