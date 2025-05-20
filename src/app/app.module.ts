import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthService } from 'src/services/auth.service';
import { HttpService } from 'src/services/http.service';
import { SettingService } from 'src/services/setting.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AppComponent, UnauthorizedComponent, NotFoundComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    HttpService,
    SettingService
  ],
})
export class AppModule { }
