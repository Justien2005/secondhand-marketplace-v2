import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/pages/model/user.model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    console.log('RegisterComponent initialized');
    this.initUserForm();
  }

  initUserForm() {
    this.userForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),
    });
  }

  onLogin() {
    this.router.navigate(['/auth'], { relativeTo: this.route });
  }

  onRegist() {
    const user: User = this.userForm.value as User;
    this.authService.register(user).subscribe({
      next: (res) => {
        console.log('Registration successful:', res);
        this.router.navigate(['/auth'], { relativeTo: this.route });
      },
      error: (err) => {
        console.error('Error during registration:', err);
      },
    })
  }
}
