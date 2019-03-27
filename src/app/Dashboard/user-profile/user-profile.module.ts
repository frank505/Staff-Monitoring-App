import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserProfilePage } from './user-profile.page';

const routes: Routes = [
  {
    path: 'user-profile',
    component: UserProfilePage,
    children: [
      {
         path: 'add-user',
       loadChildren: '../../Dashboard/add-user/add-user.module#AddUserPageModule' 
      },
      {
         path: 'view-users',
          loadChildren: '../../Dashboard/view-users/view-users.module#ViewUsersPageModule'
         },
      { 
        path: 'view-user', 
         loadChildren: '../../Dashboard/view-user/view-user.module#ViewUserPageModule'
        },
      { path: 'financial-report', 
      loadChildren: '../../Dashboard/financial-report/financial-report.module#FinancialReportPageModule'
     }
    ]
  },
  {
    path: '',
    redirectTo: 'user-profile/add-user',
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
  declarations: [UserProfilePage]
})
export class UserProfilePageModule {}
