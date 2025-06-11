import { InjectionToken, Signal, Injector } from '@angular/core';

export interface PluginAction {
  key: string;
  label: string;
  execute: (assetId: string) => Signal<boolean>;
}

export interface LazyPluginAction {
  key: string;
  label: string;
  loadAction: (injector: Injector) => Promise<PluginAction>;
}

export const PLUGIN_ACTIONS = new InjectionToken<LazyPluginAction[]>('PLUGIN_ACTIONS', {
  providedIn: 'root',
  factory: () => []
});
