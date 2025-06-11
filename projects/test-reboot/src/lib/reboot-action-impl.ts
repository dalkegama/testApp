import { TestRebootService } from './test-reboot.service';

export function createRebootAction(rebootService: TestRebootService) {
  return {
    key: 'reboot',
    label: 'Reboot Asset',
    execute: (assetId: string) => {
      rebootService.rebootAsset(assetId);
      return rebootService.isRebooting;
    }
  };
}
