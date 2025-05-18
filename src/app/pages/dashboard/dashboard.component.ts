import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
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
    this.router.navigate(['admin'], { relativeTo: this.route });
  }

  onSeller() {
    this.router.navigate(['seller'], { relativeTo: this.route });
  }

  onBuyer() {
    this.router.navigate(['buyer'], { relativeTo: this.route });
  }

}
