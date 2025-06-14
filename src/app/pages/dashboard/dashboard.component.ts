import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SettingService } from 'src/services/setting.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  userPermissions: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private setting: SettingService
  ) { }

  ngOnInit(): void {
    this.userPermissions = this.setting.getUserRoles().permissions;
    this.redirectToDashboard();
  }

  redirectToDashboard() {
    if (this.userPermissions.includes('DASHBOARD_ADMIN')) {
      this.onAdmin();
    } else if (this.userPermissions.includes('DASHBOARD_SELLER')) {
      this.onSeller();
    } else if (this.userPermissions.includes('DASHBOARD_BUYER')) {
      this.onBuyer();
    }
  }

  onAdmin() {
    this.router.navigate(['pages/dashboard/admin']);
  }

  onSeller() {
    this.router.navigate(['pages/dashboard/seller']);
  }

  onBuyer() {
    this.router.navigate(['pages/dashboard/buyer']);
  }

}
