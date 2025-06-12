import { Component, computed, inject, input, Signal, signal } from '@angular/core';
import { TestPluginService } from '../../../test-plugin/src/public-api';

@Component({
  selector: 'lib-test-reboot',
  imports: [],
  template: `
    <div class="reboot-card">
      <p>Asset: {{ assetId() }}</p>
      <p>Status: {{ status() }}</p>

      @if (pluginManager.hasAction('reboot')) {
        <button
          (click)="executeReboot()"
          [disabled]="isRebooting()"
          class="reboot-button">
          {{ isRebooting() ? 'Rebooting...' : 'Reboot Asset' }}
        </button>
      } @else {
        <p class="no-action">Reboot plugin not available</p>
      }
    </div>
  `,
  styles: ``
})
export class TestRebootComponent {
  assetId = input.required<string>();
  status = input<string>('Online');

  pluginManager = inject(TestPluginService);

  private rebootSignal = signal<Signal<boolean> | null>(null);
  isRebooting = computed(() => this.rebootSignal()?.() ?? false);

  executeReboot(): void {
    const signal = this.pluginManager.executeActionFromFactory('reboot', this.assetId());
    if (signal) {
      this.rebootSignal.set(signal);
    }
  }
}
