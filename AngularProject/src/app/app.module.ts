import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng5SliderModule } from 'ng5-slider';
import { AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpClientModule } from '@ngx-progressbar/http-client';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { AppComponent } from './app.component';
import { HeaderComponent } from './Component/share/header/header.component';
import { FooterComponent } from './Component/share/footer/footer.component';
import { LeftSidebarComponent } from './Component/share/left-sidebar/left-sidebar.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { HomeComponent } from './Component/home/home.component';
import { ShopComponent } from './Component/shop/shop.component';
import { LoginComponent } from './Component/login/login.component';
import { BlogListComponent } from './Component/blog-list/blog-list.component';
import { BlogSingleComponent } from './Component/blog-single/blog-single.component';
import { ContactComponent } from './Component/contact/contact.component';
import { Page404Component } from './Component/page404/page404.component';
import { CartComponent } from './Component/cart/cart.component';
import { CheckoutComponent } from './Component/checkout/checkout.component';
import { ShopListProductComponent } from './Component/shop-list-product/shop-list-product.component';
import { ProductListCommentComponent } from './Component/product-list-comment/product-list-comment.component';
import { AccountComponent } from './Component/account/account.component';
import { UserProfileComponent } from './Component/user-profile/user-profile.component';
import { CustomClothesComponent } from './Component/custom-clothes/custom-clothes.component';
import { CourseDialogComponent } from './Component/course-dialog/course-dialog.component';
import { CustomComponent } from './Component/custom/custom.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeftSidebarComponent,
    ProductDetailsComponent,
    HomeComponent,
    ShopComponent,
    LoginComponent,
    BlogListComponent,
    BlogSingleComponent,
    ContactComponent,
    Page404Component,
    CartComponent,
    ProductListCommentComponent,
    CheckoutComponent,
    ShopListProductComponent,
    AccountComponent,
    UserProfileComponent,
    CustomClothesComponent,
    CourseDialogComponent,
    CustomComponent,
  ],
  imports: [
    MatExpansionModule,
    NgProgressModule.forRoot(),
    NgProgressHttpClientModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng5SliderModule,
   
    NgxChartsModule,
  
    HttpClientModule, TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDfni1WuIp9vDdQ-FtQoPF-OQ4LfRggcYY",
      libraries: ["places", "geometry"]
    }),
    RouterModule.forRoot([
      { path: 'products', component: ProductDetailsComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'login', component: LoginComponent },
      { path: 'blog/blog-list', component: BlogListComponent },
      { path: 'blog/blog-single', component: BlogSingleComponent },
      { path: 'contact-us', component: ContactComponent },
      { path: 'page-404', component: Page404Component },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'account', component: AccountComponent },
      { path: 'user', component: UserProfileComponent },
      { path: 'custom-clothes', component: CustomClothesComponent },
      { path: 'testDialog', component: CourseDialogComponent },
      { path: 'custom', component: CustomComponent },
      { path: '', component: HomeComponent }
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

export function translateFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
