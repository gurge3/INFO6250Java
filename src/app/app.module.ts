import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from  '@angular/forms';//ngModel,ngForm
import { HttpModule} from '@angular/http';//Http
import { ReactiveFormsModule} from  '@angular/forms';//formController
import { AppRoutingModule} from './app-routing/app-routing.module';

import { ModalModule } from 'ng2-modal';
import { CookieService } from 'ngx-cookie-service';


//import { RouterModule} from '@angular/router';

//Main App Component
import { AppComponent } from './app.component';

//User App Model
import { RoleComponent } from './admin/role/role.component';
import { NavComponent } from './navigation/nav/nav.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

//Services
import {RoleService} from './admin/role/role.service';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './service/authentication.service';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './service/register.service';
import { UserManagementComponent } from '../app/admin/user-management/user-management.component';
import { UserService } from './service/user.service';
import { CategoryComponent } from './admin/category/category.component';
import { CategoryService } from './service/category.service';
import { IdeaComponent } from './admin/idea/idea.component';
import { IdeaService } from './service/idea.service';


@NgModule({
  declarations: [
    AppComponent,
    RoleComponent,
    NavComponent,
    AdminHomeComponent,
    LoginComponent,
    RegisterComponent,
    UserManagementComponent,
    CategoryComponent,
    IdeaComponent
  ],
  imports: [
    AppRoutingModule,   
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    ModalModule 
  ],
  providers: [
    RoleService,
    AuthenticationService,
    RegisterService,
    UserService,
    CategoryService,
    IdeaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
