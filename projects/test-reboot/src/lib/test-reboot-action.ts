import { Provider, Injector } from '@angular/core';
import { PLUGIN_ACTIONS } from '../../../test-plugin/src/public-api';
import { TestRebootService } from './test-reboot.service'

export function provideRebootAction(): Provider {
  return {
    provide: PLUGIN_ACTIONS,
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
