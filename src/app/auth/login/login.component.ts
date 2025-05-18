import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    console.log('LoginComponent initialized');
    localStorage.clear();
    localStorage.setItem('save-login', 'true');
  }

  onRegist() {
    console.log('Register button clicked');
    this.router.navigate(['/auth/register'], { relativeTo: this.route });
  }

  onSubmitLogin() {
    this.router.navigate(['/pages/dashboard'], { relativeTo: this.route });
  }

}
