import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  { path: 'dashboard', loadChildren: '../Dashboard/menu/menu.module#MenuPageModule' },
  { path: 'message-creator-app-modal', loadChildren: '../Dashboard/message-creator-app-modal/message-creator-app-modal.module#MessageCreatorAppModalPageModule' },
  // { path: 'staff-login-details-search-modal', loadChildren: '../Dashboard/staff-login-details-search-modal/staff-login-details-search-modal.module#StaffLoginDetailsSearchModalPageModule' },
  // { path: 'financial-history-modal', loadChildren: '../Dashboard/financial-history-modal/financial-history-modal.module#FinancialHistoryModalPageModule' },
  // { path: 'staff-full-login-details', loadChildren: './staff-full-login-details/staff-full-login-details.module#StaffFullLoginDetailsPageModule' },
 
  // { path: 'financial-report', loadChildren: '../Dashboard/financial-report/financial-report.module#FinancialReportPageModule' },
  // { path: 'financial-modal', loadChildren: '../Dashboard/financial-modal/financial-modal.module#FinancialModalPageModule' },
 // { path: 'full-task-details', loadChildren: './full-task-details/full-task-details.module#FullTaskDetailsPageModule' },
  // { path: 'tasks', loadChildren: '../Dashboard/tasks/tasks.module#TasksPageModule' },
  // { path: 'create-task', loadChildren: '../Dashboard/create-task/create-task.module#CreateTaskPageModule' },
  // { path: 'view-task', loadChildren: '../Dashboard/view-task/view-task.module#ViewTaskPageModule' },
  // { path: 'add-user', loadChildren: '../Dashboard/add-user/add-user.module#AddUserPageModule' },
  // { path: 'view-users', loadChildren: '../Dashboard/view-users/view-users.module#ViewUsersPageModule' },
  // { path: 'view-user', loadChildren: '../Dashboard/view-user/view-user.module#ViewUserPageModule' },
 // { path: 'user-profile', loadChildren: '../Dashboard/user-profile/user-profile.module#UserProfilePageModule' },
  // { path: 'your-profile', loadChildren: '../Dashboard/your-profile/your-profile.module#YourProfilePageModule' },
  // { path: 'update-profile', loadChildren: '../Dashboard/update-profile/update-profile.module#UpdateProfilePageModule' },
  // { path: 'admin-profile', loadChildren: '../Dashboard/admin-profile/admin-profile.module#AdminProfilePageModule' },
  // { path: 'new-admin', loadChildren: '../Dashboard/new-admin/new-admin.module#NewAdminPageModule' },
  // { path: 'view-admin', loadChildren: '../Dashboard/view-admin/view-admin.module#ViewAdminPageModule' },
    // { path: 'home', loadChildren: '../Dashboard/home/home.module#HomePageModule' },
 // { path: '/dashboard/profile', loadChildren: '../Dashboard/profile/profile.module#ProfilePageModule' },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})



export class DashboardRoutingModule { }
