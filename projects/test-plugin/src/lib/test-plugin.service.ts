import { computed, inject, Injectable, Signal } from '@angular/core';
import { PLUGIN_ACTIONS } from './test-plugin-action-token';

@Injectable({
  providedIn: 'root'
})
export class TestPluginService {
  private readonly pluginActions = inject(PLUGIN_ACTIONS, { optional: false });
  readonly actions = computed(() => this.pluginActions || []);

  hasAction(key: string): boolean {
    return this.actions().some(action => action.key === key);
  }

  executeAction(key: string, assetId: string): Signal<boolean> | null {
    const action = this.actions().find(action => action.key === key);

    if (!action) {
      console.error(`Plugin action "${key}" not found`);
      return null;
    }

    console.log(`Executing plugin action: ${key} for asset: ${assetId}`);
    return action.execute(assetId);
  }
}
