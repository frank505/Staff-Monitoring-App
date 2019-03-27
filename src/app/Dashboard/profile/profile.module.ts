import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';




const routes: Routes = [
  {
    
    path: 'profile',
    component: ProfilePage,
    children: [
      {
        path: 'new-admin',
        loadChildren: '../../Dashboard/new-admin/new-admin.module#NewAdminPageModule'
      },
      {
        path: 'view-admin',
        loadChildren: '../../Dashboard/view-admin/view-admin.module#ViewAdminPageModule',
        
      },
      {
        path:'your-profile',
        loadChildren:'../../Dashboard/your-profile/your-profile.module#YourProfilePageModule'
      },
      {
        path:'update-profile',
        loadChildren:'../../Dashboard/update-profile/update-profile.module#UpdateProfilePageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'profile/new-admin',
    pathMatch: 'full'
  }

];





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
