import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MessageCreatorAppModalPage } from './message-creator-app-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MessageCreatorAppModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MessageCreatorAppModalPage]
})
export class MessageCreatorAppModalPageModule {}
