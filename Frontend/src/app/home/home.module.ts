import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '../app-material.module';
import { NavbarComponent } from '../home/navbar/navbar.component';
import { HomeRoute } from '../home/home.routes';
import { MainComponent } from './main/main.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AccountComponent,
    NavbarComponent,
    MainComponent,
    ProductComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(HomeRoute),
    AppMaterialModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [],

})
export class HomeModule { }
