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
import { SellerService } from 'src/services/seller.service';
import { ProductService } from 'src/services/product.service';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [AppComponent, UnauthorizedComponent, NotFoundComponent, DashboardComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    HttpService,
    SettingService,
    SellerService,
    ProductService
  ],
})
export class AppModule { }
