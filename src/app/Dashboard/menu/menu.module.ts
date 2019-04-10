import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
 
const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: '../../Dashboard/home/home.module#HomePageModule'
      },
      {
        path: 'profile',
        loadChildren: '../../Dashboard/profile/profile.module#ProfilePageModule',
      },
      {
        path: 'user-profile',
        loadChildren: '../../Dashboard/user-profile/user-profile.module#UserProfilePageModule',
      },
      {
        path: 'tasks',
        loadChildren: '../../Dashboard/tasks/tasks.module#TasksPageModule',
      },
      {
        path:'staff-login-details',
        loadChildren:'../../Dashboard/staff-login-details/staff-login-details.module#StaffLoginDetailsPageModule'
      },
      {
        path:'staff-full-login-details',
        loadChildren:'../../Dashboard/staff-full-login-details/staff-full-login-details.module#StaffFullLoginDetailsPageModule'
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }