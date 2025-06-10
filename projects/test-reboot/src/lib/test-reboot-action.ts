import { Provider, inject } from '@angular/core';
import { PLUGIN_ACTIONS } from '../../../test-plugin/src/public-api';
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
