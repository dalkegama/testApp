import { Provider, inject, Injector } from '@angular/core';
import { PLUGIN_ACTIONS, LAZY_PLUGIN_ACTIONS } from '../../../test-plugin/src/public-api';
import { TestRebootService } from './test-reboot.service'

export function provideRebootAction(): Provider {
  return {
    provide: PLUGIN_ACTIONS,
    useFactory: () => {
      const rebootService = inject(TestRebootService);
      return {
        key: 'reboot',
        label: 'Reboot Asset',
        execute: (assetId: string) => {
          rebootService.rebootAsset(assetId);
          return rebootService.isRebooting;
        }
      };
    },
    multi: true
  };
}

export function provideLazyRebootAction(): Provider {
  return {
    provide: LAZY_PLUGIN_ACTIONS,
    useFactory: () => {
      return {
        key: 'reboot',
        label: 'Reboot Asset',
        loadAction: async (injector: Injector) => {
          // Dynamically import the action when needed
          const { createRebootAction } = await import('./reboot-action-impl');
          const rebootService = injector.get(TestRebootService);
          return createRebootAction(rebootService);
        }
      };
    },
    multi: true
  };
}
