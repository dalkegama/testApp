import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestRebootService {

  readonly isRebooting = signal(false);

  rebootAsset(assetId: string): void {
    this.isRebooting.set(true);

    console.log(`Initiating reboot for asset ${assetId}`);

    setTimeout(() => {
      console.log(`Reboot completed for asset ${assetId}`);
      this.isRebooting.set(false);
    }, 2000);
  }
}
