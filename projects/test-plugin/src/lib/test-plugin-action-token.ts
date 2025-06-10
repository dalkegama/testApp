import { InjectionToken, Signal } from '@angular/core';

export interface PluginAction {
  key: string;
  label: string;
  execute: (assetId: string) => Signal<boolean>;
}

export const PLUGIN_ACTIONS = new InjectionToken<PluginAction[]>('PLUGIN_ACTIONS', {
  providedIn: 'root',
  factory: () => []
});
