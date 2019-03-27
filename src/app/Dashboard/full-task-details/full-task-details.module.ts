import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FullTaskDetailsPage } from './full-task-details.page';

const routes: Routes = [
  {
    path: '',
    component: FullTaskDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FullTaskDetailsPage]
})
export class FullTaskDetailsPageModule {}
