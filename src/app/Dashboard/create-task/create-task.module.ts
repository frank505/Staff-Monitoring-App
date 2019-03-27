import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateTaskPage } from './create-task.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { FileUploadModule } from 'ng2-file-upload';

const routes: Routes = [
  {
    path: '',
    component: CreateTaskPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonicSelectableModule,
    FileUploadModule
  ],
  declarations: [CreateTaskPage]
})
export class CreateTaskPageModule {}
