import { CategoryService } from './service/category/category.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import {Http,HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms'
import { MatDataTableModule } from "ng2-md-datatable";
import { MatButtonModule, MatIconModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { ProductComponent } from './user/product/product.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { PaymentComponent } from './user/payment/payment.component';
import { OrderhistoryComponent } from './user/orderhistory/orderhistory.component';
import { ManageProductComponent } from './admin/manage-product/manage-product.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavbarComponent } from './common/navbar/navbar.component';

import { ProductService } from './service/product/product.service';
import { AppService } from './user/product/app.service';
import { GenericError } from './common/error/GenericError';
import { LoginService } from './service/auth/login/login.service';
import { ProductListComponent } from './user/product-list/product-list/product-list.component';
import { ManageCategoryComponent } from './admin/manage-category/manage-category/manage-category.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CheckoutComponent,
    PaymentComponent,
    OrderhistoryComponent,
    ManageProductComponent,
    ManageUserComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProductListComponent,
    ManageCategoryComponent

    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDataTableModule,
    MatButtonModule,
    MatIconModule,
    NgbModule.forRoot(),

    RouterModule.forRoot([
      {path:'product',component:ProductComponent},
      {path:'user/checkout', component: CheckoutComponent},
      {path:'user/payment', component: PaymentComponent},
      {path:'user/orderhistory', component: OrderhistoryComponent},
      {path:"productList",component:ProductListComponent},

      {path:'admin/manageproduct', component: ManageProductComponent},
      {path:'admin/manageproduct/:id',component:ManageProductComponent},
      {path:'admin/manageuser', component: ManageUserComponent},
      
      {path:'auth/login', component: LoginComponent},
      {path:'auth/register', component: RegisterComponent}
            
    ])
  ],
  providers: [
    LoginService,
    GenericError,
    AppService,
    ProductService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
