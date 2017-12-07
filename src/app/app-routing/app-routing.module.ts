import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

import { RoleComponent } from './../admin/role/role.component';
import { AdminHomeComponent } from './../admin/admin-home/admin-home.component';
// imports 
import {Routes}from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { UserManagementComponent } from '../admin/user-management/user-management.component';
import { CategoryComponent } from '../admin/category/category.component';
import { IdeaComponent } from '../admin/idea/idea.component';


const routes: Routes = [
  {path: 'home', component: AdminHomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'role', component: RoleComponent},
  {path: 'login', component: LoginComponent},
  {path: 'userManagement', component: UserManagementComponent},
  {path: 'categoryManagement', component: CategoryComponent},
  {path: 'ideaManagement', component: IdeaComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: AdminHomeComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash: true}),    
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
