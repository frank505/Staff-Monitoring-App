import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FinancialHistoryModalPage } from './financial-history-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FinancialHistoryModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FinancialHistoryModalPage]
})
export class FinancialHistoryModalPageModule {}
