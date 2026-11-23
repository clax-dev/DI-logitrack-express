import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { IonBadge, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  cubeOutline,
  locationOutline,
  scaleOutline,
  timeOutline,
} from 'ionicons/icons';
import {
  PackageStatus,
  PackageStatusChangeEvent,
  WarehousePackage,
} from '../../models/package.model';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [DatePipe, DecimalPipe, IonBadge, IonButton, IonIcon],
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageCardComponent {
  // Entrada obligatoria mediante Signal Input (desacoplado de PackageService)
  public readonly packageData = input.required<WarehousePackage>();

  // Emisión tipada de eventos hacia el componente padre
  public readonly statusChange = output<PackageStatusChangeEvent>();

  protected readonly statusLabel = computed(() => {
    const labels: Record<PackageStatus, string> = {
      IN_TRANSIT: 'En cinta',
      INSPECTED: 'Inspeccionado',
      REJECTED: 'Rechazado',
    };
    return labels[this.packageData().status];
  });

  protected readonly priorityLabel = computed(() => {
    const labels = {
      CRITICAL: 'Crítica',
      STANDARD: 'Estándar',
      LOW: 'Baja',
    };
    return labels[this.packageData().priority];
  });

  constructor() {
    addIcons({
      checkmarkCircleOutline,
      closeCircleOutline,
      cubeOutline,
      locationOutline,
      scaleOutline,
      timeOutline,
    });
  }

  protected emitStatus(newStatus: Extract<PackageStatus, 'INSPECTED' | 'REJECTED'>): void {
    const pkg = this.packageData();
    if (pkg.status === newStatus) {
      return;
    }
    this.statusChange.emit({
      id: pkg.id,
      newStatus,
    });
  }
}
