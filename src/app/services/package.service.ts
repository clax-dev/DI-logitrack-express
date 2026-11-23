import { Injectable, computed, signal } from '@angular/core';
import { PackageStatus, WarehousePackage } from '../models/package.model';

const INITIAL_PACKAGES: readonly WarehousePackage[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    trackingCode: 'LTK-4092-ES',
    destinationHub: 'HUB-MADRID-SUR',
    weightKg: 14.5,
    priority: 'CRITICAL',
    status: 'IN_TRANSIT',
    timestamp: new Date('2026-11-19T08:12:00Z'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    trackingCode: 'LTK-8821-ES',
    destinationHub: 'HUB-BARCELONA-ZAL',
    weightKg: 3.2,
    priority: 'STANDARD',
    status: 'INSPECTED',
    timestamp: new Date('2026-11-19T08:25:00Z'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    trackingCode: 'LTK-1047-ES',
    destinationHub: 'HUB-VALENCIA-PUERTO',
    weightKg: 28.0,
    priority: 'CRITICAL',
    status: 'IN_TRANSIT',
    timestamp: new Date('2026-11-19T08:40:00Z'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    trackingCode: 'LTK-5519-ES',
    destinationHub: 'HUB-ZARAGOZA-PLAZA',
    weightKg: 7.8,
    priority: 'LOW',
    status: 'REJECTED',
    timestamp: new Date('2026-11-19T08:52:00Z'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    trackingCode: 'LTK-7304-ES',
    destinationHub: 'HUB-SEVILLA-ESTE',
    weightKg: 11.4,
    priority: 'STANDARD',
    status: 'IN_TRANSIT',
    timestamp: new Date('2026-11-19T09:05:00Z'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    trackingCode: 'LTK-9910-ES',
    destinationHub: 'HUB-BILBAO-NORTE',
    weightKg: 2.1,
    priority: 'LOW',
    status: 'INSPECTED',
    timestamp: new Date('2026-11-19T09:18:00Z'),
  },
];

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  // Estado privado inmutable gestionado con Angular Signals
  readonly #packages = signal<readonly WarehousePackage[]>(INITIAL_PACKAGES);

  // Exposición de solo lectura hacia los componentes consumidores
  public readonly packages = this.#packages.asReadonly();

  // Métricas derivadas reactivas (computed)
  public readonly stats = computed(() => {
    const list = this.#packages();
    return {
      total: list.length,
      inTransit: list.filter((p) => p.status === 'IN_TRANSIT').length,
      inspected: list.filter((p) => p.status === 'INSPECTED').length,
      rejected: list.filter((p) => p.status === 'REJECTED').length,
    };
  });

  /**
   * Actualiza de forma inmutable el estado de un paquete por su UUID.
   */
  public updatePackageStatus(id: string, newStatus: PackageStatus): void {
    this.#packages.update((currentList) =>
      currentList.map((pkg) =>
        pkg.id === id
          ? {
              ...pkg,
              status: newStatus,
              timestamp: new Date(),
            }
          : pkg
      )
    );
  }

  /**
   * Restaura el estado inicial de la cinta (útil para demostraciones en clase).
   */
  public resetDemoData(): void {
    this.#packages.set(INITIAL_PACKAGES);
  }
}
