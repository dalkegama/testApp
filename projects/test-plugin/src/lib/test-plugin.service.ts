import { computed, inject, Injectable, Signal, Injector, signal } from '@angular/core';
import { PLUGIN_ACTIONS, LAZY_PLUGIN_ACTIONS, PluginAction } from './test-plugin-action-token';

@Injectable({
  providedIn: 'root'
})
export class TestPluginService {
  private readonly pluginActions = inject(PLUGIN_ACTIONS, { optional: false });
  private readonly lazyPluginActions = inject(LAZY_PLUGIN_ACTIONS, { optional: false });
  private readonly injector = inject(Injector);
  private loadedActions = new Map<string, PluginAction>();

  readonly actions = computed(() => [
    ...this.pluginActions || [],
    ...this.lazyPluginActions.map(lazy => ({
      key: lazy.key,
      label: lazy.label,
      execute: (assetId: string) => this.getOrCreateLazyActionSignal(lazy.key, assetId)
    }))
  ]);

  hasAction(key: string): boolean {
    return this.actions().some(action => action.key === key);
  }

  executeAction(key: string, assetId: string): Signal<boolean> | null {
    // Check if it's a regular action first
    const action = this.pluginActions?.find(action => action.key === key);
    if (action) {
      console.log(`Executing plugin action: ${key} for asset: ${assetId}`);
      return action.execute(assetId);
    }

    // Check if it's a lazy action
    const lazyAction = this.lazyPluginActions.find(action => action.key === key);
    if (lazyAction) {
      return this.getOrCreateLazyActionSignal(key, assetId);
    }

    console.error(`Plugin action "${key}" not found`);
    return null;
  }

  private getOrCreateLazyActionSignal(key: string, assetId: string): Signal<boolean> {
    // Check if action is already loaded
    if (this.loadedActions.has(key)) {
      const action = this.loadedActions.get(key)!;
      console.log(`Executing cached lazy plugin action: ${key} for asset: ${assetId}`);
      return action.execute(assetId);
    }

    // Create a loading signal that will be replaced once the action loads
    const loadingSignal = signal(false);

    // Start loading the action
    this.loadLazyAction(key, assetId, loadingSignal);

    return loadingSignal;
  }

  private async loadLazyAction(key: string, assetId: string, loadingSignal: any): Promise<void> {
    try {
      // Find the lazy action
      const lazyAction = this.lazyPluginActions.find(action => action.key === key);
      if (!lazyAction) {
        throw new Error(`Lazy plugin action "${key}" not found`);
      }

      console.log(`Loading lazy plugin action: ${key}`);
      loadingSignal.set(true);

      const loadedAction = await lazyAction.loadAction(this.injector);
      this.loadedActions.set(key, loadedAction);

      console.log(`Executing lazy plugin action: ${key} for asset: ${assetId}`);

      // Execute the loaded action and get its signal
      const actionSignal = loadedAction.execute(assetId);

      // Update the loading signal to match the action signal
      loadingSignal.set(actionSignal());

      // Keep the loading signal in sync with the action signal
      const syncInterval = setInterval(() => {
        loadingSignal.set(actionSignal());
      }, 100);

      // Clean up after 10 seconds (or when action completes)
      setTimeout(() => clearInterval(syncInterval), 10000);

    } catch (error) {
      loadingSignal.set(false);
      console.error(`Error loading lazy action ${key}:`, error);
    }
  }
}
