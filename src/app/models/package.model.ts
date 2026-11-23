export type PackagePriority = 'CRITICAL' | 'STANDARD' | 'LOW';

export type PackageStatus = 'IN_TRANSIT' | 'INSPECTED' | 'REJECTED';

export type PriorityFilter = PackagePriority | 'ALL';

export interface WarehousePackage {
  readonly id: string; // UUID v4
  trackingCode: string; // Formato LTK-XXXX-ES
  destinationHub: string;
  weightKg: number;
  priority: PackagePriority;
  status: PackageStatus;
  timestamp: Date;
}

export interface PackageStatusChangeEvent {
  readonly id: string;
  readonly newStatus: Extract<PackageStatus, 'INSPECTED' | 'REJECTED'>;
}
