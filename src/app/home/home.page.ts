import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/angular/standalone';
import type { SearchbarInputEventDetail, SegmentChangeEventDetail } from '@ionic/angular';
import type { IonSearchbarCustomEvent, IonSegmentCustomEvent } from '@ionic/core';
import { addIcons } from 'ionicons';
import {
  checkmarkDoneOutline,
  closeOutline,
  cubeOutline,
  refreshOutline,
  warningOutline,
} from 'ionicons/icons';
import { PackageCardComponent } from '../components/package-card/package-card.component';
import {
  PackageStatus,
  PackageStatusChangeEvent,
  PriorityFilter,
} from '../models/package.model';
import { PackageService } from '../services/package.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToast,
    IonToolbar,
    PackageCardComponent,
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  readonly #packageService = inject(PackageService);

  // Estado reactivo de filtros (Tarea 5: Signals puras sin fugas de memoria)
  protected readonly searchTerm = signal<string>('');
  protected readonly selectedPriority = signal<PriorityFilter>('ALL');

  // Estado para feedback inmediato (Toast accesible)
  protected readonly toastMessage = signal<string>('');
  protected readonly isToastOpen = signal<boolean>(false);

  // Métricas globales desde el servicio
  protected readonly stats = this.#packageService.stats;

  /**
   * Lista filtrada reactiva derivada con computed().
   * Ventaja frente a RxJS manual con .subscribe():
   * 1. Cero riesgo de memory leaks (no requiere takeUntilDestroyed ni ngOnDestroy).
   * 2. Memorización automática y evaluación perezosa.
   * 3. Tipado estricto de extremo a extremo.
   */
  protected readonly filteredPackages = computed(() => {
    const query = this.searchTerm().trim().toLowerCase();
    const priority = this.selectedPriority();
    const allPackages = this.#packageService.packages();

    return allPackages.filter((pkg) => {
      const matchesPriority = priority === 'ALL' || pkg.priority === priority;
      const matchesQuery =
        query.length === 0 ||
        pkg.trackingCode.toLowerCase().includes(query) ||
        pkg.destinationHub.toLowerCase().includes(query);

      return matchesPriority && matchesQuery;
    });
  });

  constructor() {
    addIcons({
      checkmarkDoneOutline,
      closeOutline,
      cubeOutline,
      refreshOutline,
      warningOutline,
    });
  }

  /**
   * Evento tipado estrictamente (sin uso de 'any').
   * El debounce de 250ms se delega de forma nativa a [debounce]="250" en ion-searchbar.
   */
  protected onSearchInput(event: IonSearchbarCustomEvent<SearchbarInputEventDetail>): void {
    const value = event.detail.value ?? '';
    this.searchTerm.set(value);
  }

  protected onPriorityChange(event: IonSegmentCustomEvent<SegmentChangeEventDetail>): void {
    const value = event.detail.value;
    if (value === 'ALL' || value === 'CRITICAL' || value === 'STANDARD' || value === 'LOW') {
      this.selectedPriority.set(value);
    }
  }

  protected handleStatusChange(event: PackageStatusChangeEvent): void {
    this.#packageService.updatePackageStatus(event.id, event.newStatus);
    const label = event.newStatus === 'INSPECTED' ? 'INSPECCIONADO' : 'RECHAZADO';
    this.showFeedback(`Estado actualizado correctamente a ${label}.`);
  }

  protected handleSlideAction(
    id: string,
    newStatus: Extract<PackageStatus, 'INSPECTED' | 'REJECTED'>,
    slidingItem: IonItemSliding
  ): void {
    this.handleStatusChange({ id, newStatus });
    void slidingItem.close();
  }

  protected resetDemo(): void {
    this.#packageService.resetDemoData();
    this.searchTerm.set('');
    this.selectedPriority.set('ALL');
    this.showFeedback('Cinta transportadora reiniciada con datos iniciales.');
  }

  /**
   * Fix auditoría: "Limpiar filtros" llamaba a resetDemo(), que además de los filtros
   * restauraba los paquetes y borraba las inspecciones hechas por el operario.
   * Ahora solo limpia los filtros; el estado de la cinta no se toca.
   */
  protected clearFilters(): void {
    this.searchTerm.set('');
    this.selectedPriority.set('ALL');
  }

  protected onToastDismiss(): void {
    this.isToastOpen.set(false);
  }

  private showFeedback(message: string): void {
    this.toastMessage.set(message);
    this.isToastOpen.set(true);
  }
}
