import { Component, isStandalone, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit{

ngOnInit(): void {
  console.log('AuthComponent initialized');
  console.log(isStandalone(LoginComponent));
}

}
