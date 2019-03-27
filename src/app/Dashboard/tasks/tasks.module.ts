import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TasksPage } from './tasks.page';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksPage,
    children:[
      {
        path:'create-task',
        loadChildren:'../../Dashboard/create-task/create-task.module#CreateTaskPageModule'
      },
      {
        path:'view-task',
        loadChildren:'../../Dashboard/view-task/view-task.module#ViewTaskPageModule'
      },
      {
        path:'full-task-details',
        loadChildren:'../../Dashboard/full-task-details/full-task-details.module#FullTaskDetailsPageModule'
      },
      {
        path:'update-task',
        loadChildren:'../../Dashboard/update-task/update-task.module#UpdateTaskPageModule'
      }
      
    ]
  },{
    path: '',
    redirectTo: 'tasks/create-task',
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
  declarations: [TasksPage]
})
export class TasksPageModule {}
