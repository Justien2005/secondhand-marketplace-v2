import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/pages/model/user.model';
import { AuthService } from 'src/services/auth.service';
import { SettingService } from 'src/services/setting.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private setting: SettingService
  ) {
  }

  ngOnInit(): void {
    console.log('LoginComponent initialized');
    this.checkToken();
  }

  initUserForm() {
    this.userForm = new FormGroup({
      password: new FormControl(''),
      email: new FormControl(''),
    });
  }

  checkToken() {
    const token = this.setting.getToken();
    if (token) {
      this.authService.verifyToken().subscribe({
        next: (res: { status: boolean }) => {
          console.log('Token is... :', res.status);
          if (res.status) {
            this.router.navigate(['/pages/dashboard']);
            return;
          } else {
            console.log('Token is invalid, redirecting to login...');
          }
        },
        error: (err) => {
          console.error('Token verification failed:', err);
        },
      })
    }
    this.initUserForm();
  }

  onRegistPage() {
    console.log('Register button clicked');
    this.router.navigate(['/auth/register'], { relativeTo: this.route });
  }

  onSubmitLogin() {
    const user: User = this.userForm.value as User;
    this.authService.login(user).subscribe({
      next: (res: { token: string }) => {
        console.log('Login successful:', res);
        this.setting.storeToken(res.token);
        this.router.navigate(['/pages/dashboard'], { relativeTo: this.route });
      },
      error: (err) => {
        console.error('Error during registration:', err);
      },
    })
  }

}
