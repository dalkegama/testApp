import { TestRebootService } from './test-reboot.service';
import {PluginAction} from '../../../test-plugin/src/lib/test-plugin-action-token';
import {Injectable, Signal} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ManageTagsAction implements PluginAction {
  readonly key = "manage-tags";
  readonly label = "Manage Tags";

  constructor(private rebootService: TestRebootService) {}

  execute(assetId: string): Signal<boolean> {
    this.rebootService.rebootAsset(assetId);
    return this.rebootService.isRebooting;
  }
}
