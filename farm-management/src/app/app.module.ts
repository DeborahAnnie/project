import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { LivestockComponent } from './livestock/livestock.component';
import { FertilizerComponent } from './fertilizer/fertilizer.component';
import { LoginComponent } from './login/login.component';
import { PesticidesComponent } from './pesticides/pesticides.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { CropsComponent } from './crops/crops.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { FarmPipePipe } from './farm-pipe.pipe';
import { AddStockComponent } from './add-stock/add-stock.component';
import { ViewStockComponent } from './view-stock/view-stock.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FilterPipe } from './filter.pipe';
import { HttpCallInterceptor } from './interceptor';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'livestock', component: LivestockComponent },
  { path: 'fertilizer', component: FertilizerComponent },
  { path: 'pesticide', component: PesticidesComponent },
  { path: 'crops', component: CropsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'user', component: UserInfoComponent },
  { path: 'admin', component: AdminLoginComponent },
  { path: 'addStock', component: AddStockComponent },

  { path: 'cart', component: CartComponent },
  { path: 'product', component: ProductComponent },
  { path: 'addproduct', component: AddProductComponent },
  { path: 'view', component: ViewStockComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    LivestockComponent,
    FertilizerComponent,
    LoginComponent,
    PesticidesComponent,
    SignupComponent,
    AboutComponent,
    ContactComponent,
    UserInfoComponent,
    CropsComponent,
    AdminLoginComponent,
    ProductComponent,
    CartComponent,
    FarmPipePipe,
    AddStockComponent,
    ViewStockComponent,
    AddProductComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCallInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
