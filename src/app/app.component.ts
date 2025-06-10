import { Component } from '@angular/core';
import { TestRebootComponent } from '../../projects/test-reboot/src/public-api';

@Component({
  selector: 'app-root',
  imports: [TestRebootComponent],
  template: `
  <h1>Hello World!</h1>
    <lib-test-reboot assetId="SERVER-001" />
    <lib-test-reboot assetId="SERVER-002" status="Maintenance" />
  `,
  styles: [``]
})
export class AppComponent {
  title = 'testApp';
}
