import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurdService } from './services/auth-gaurd.service';

const routes: Routes = [
  { path: '', redirectTo: 'admin/dashboard/home', pathMatch: 'full' },
   {
    path:"admin",
    loadChildren:"./Dashboard/dashboard-routing.module#DashboardRoutingModule",
    canActivate:[AuthGaurdService],
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'initializer', loadChildren: './initializer/initializer.module#InitializerPageModule' },
  { path: 'about', loadChildren: './Dasboard/about/about.module#AboutPageModule' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
