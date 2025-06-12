import {TestPluginService} from '../../projects/test-plugin/src/lib/test-plugin.service';
import {Injectable, Injector} from '@angular/core';
import {from} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActionRegistration {
  constructor(private readonly pluginService:TestPluginService,
  private readonly injector:Injector) {
  }

  init(): void {
    this.pluginService.registerActionLoader("reboot", () => {
      return from(import('../../projects/test-reboot/src/lib/reboot-action-impl')
        .then(m => this.injector.get(m.RebootAction)));
    });
    this.pluginService.registerActionLoader("takeControl", () => {
      return from(import('../../projects/test-reboot/src/lib/manage-tags-action-impl')
        .then(m => this.injector.get(m.ManageTagsAction)));
    });
    this.pluginService.registerActionLoader("manageTags", () => {
      return from(import('../../projects/test-reboot/src/lib/take-control-action-impl')
        .then(m => this.injector.get(m.TakeControlAction)));
    });
  }

}
