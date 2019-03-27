import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpdateTaskPage } from './update-task.page';
import { FileUploadModule } from 'ng2-file-upload';

const routes: Routes = [
  {
    path: '',
    component: UpdateTaskPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FileUploadModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UpdateTaskPage]
})
export class UpdateTaskPageModule {}
