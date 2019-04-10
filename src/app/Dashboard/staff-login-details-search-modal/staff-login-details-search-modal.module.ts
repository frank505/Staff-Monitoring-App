import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StaffLoginDetailsSearchModalPage } from './staff-login-details-search-modal.page';

const routes: Routes = [
  {
    path: '',
    component: StaffLoginDetailsSearchModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StaffLoginDetailsSearchModalPage]
})
export class StaffLoginDetailsSearchModalPageModule {}
