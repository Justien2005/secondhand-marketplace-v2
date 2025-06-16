import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SettingService } from 'src/services/setting.service';

@Component({
  selector: 'app-dashboard-buyer',
  imports: [SharedModule],  
  templateUrl: './dashboard-buyer.component.html',
  styleUrl: './dashboard-buyer.component.scss'
})
export class DashboardBuyerComponent {

  userData: any;

  constructor(private settings: SettingService) {
    // Initialize userData or any other properties if needed
    this.userData = this.settings.getUserAccess();
  }

}
