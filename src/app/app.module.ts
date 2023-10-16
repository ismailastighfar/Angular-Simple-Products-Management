import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorsComponent } from './errors/errors.component';
import { AppHttpInterceptor } from './services/app-http.interceptor';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModalAlertComponent } from './customer-modal-alert/customer-modal-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    NewProductComponent,
    EditProductComponent,
    DashboardComponent,
    NavbarComponent,
    ErrorsComponent,
    LoginComponent,
    AdminTemplateComponent,
    NotAuthorizedComponent,
    CustomerModalAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    {provide :HTTP_INTERCEPTORS , useClass : AppHttpInterceptor ,multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
