import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StaffFullLoginDetailsPage } from './staff-full-login-details.page';

const routes: Routes = [
  {
    path: '',
    component: StaffFullLoginDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StaffFullLoginDetailsPage]
})
export class StaffFullLoginDetailsPageModule {}
