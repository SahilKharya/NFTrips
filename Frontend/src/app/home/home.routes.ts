import { Routes } from '@angular/router';

// Components
import {AccountComponent} from "./account/account.component";
import { MainComponent } from './main/main.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';

export const HomeRoute: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'account', component: AccountComponent},
  { path: 'home', component: MainComponent},
  { path: 'product', component: ProductComponent},
  { path: 'about', component: AboutComponent},
];
