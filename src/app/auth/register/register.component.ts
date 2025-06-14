import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/pages/model/user.model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  disableSave: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.initUserForm();
    this.trackingInput();
  }

  initUserForm() {
    this.userForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl('', Validators.email),
      role_id: new FormControl(null),
    });
  }

  trackingInput() {
    this.userForm.valueChanges.subscribe((value: any) => {
      this.disableSave = !value.username || !value.password || !value.email || !value.role_id || this.userForm.invalid;
    })
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
