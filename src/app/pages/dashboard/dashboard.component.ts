import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log('DashboardComponent initialized');
    this.onAdmin();
  }

  onAdmin() {
    this.router.navigate(['pages/dashboard/admin']);
  }

  onSeller() {
    this.router.navigate(['pages/dashboard/seller'], { relativeTo: this.route });
  }

  onBuyer() {
    this.router.navigate(['pages/dashboard/buyer'], { relativeTo: this.route });
  }

}
