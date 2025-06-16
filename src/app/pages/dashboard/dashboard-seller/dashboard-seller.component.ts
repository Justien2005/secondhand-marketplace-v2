import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SettingService } from 'src/services/setting.service';

@Component({
  selector: 'app-dashboard-seller',
  imports: [SharedModule],
  templateUrl: './dashboard-seller.component.html',
  styleUrl: './dashboard-seller.component.scss'
})
export class DashboardSellerComponent {

  userData: any;

  constructor(private settings: SettingService) {
    // Initialize userData or any other properties if needed
    this.userData = this.settings.getUserAccess();
  }
  
}
