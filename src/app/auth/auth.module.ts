import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from 'src/services/auth.service';
import { HttpService } from 'src/services/http.service';
import { SettingService } from 'src/services/setting.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  // declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    HttpService,
    SettingService,
  ],
})
export class AuthModule { }
