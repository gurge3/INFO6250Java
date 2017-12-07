import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { User } from '../user-management/user.model';
import { Modal } from 'ng2-modal'
import { FormControl } from '@angular/forms';
import { UserService } from '../../service/user.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  isError: boolean = false;
  errorMessage: string;
  model: any = {};
  user: any = {};
  users: User[] = [];
  allUsers: User[] = [];
  roles = [{ "roleId": 0, "roleName": "All" }, { "roleId": 24, "roleName": "Admin" }, { "roleId": 25, "roleName": "Startup Company" }, { "roleId": 26, "roleName": "Idea Creator" }, { "roleId": 27, "roleName": "Fund Raiser" }];

  addEnabled: boolean = false;

  private addRoleCheckbox: NgModel;

  private searchField: FormControl; //[formControl]="searchField"


  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.refreshUser();
  }

  toggleAdd = () => {
    this.addEnabled = !this.addEnabled;
  };

  updateSelectValue(event: string) {
    if (event === String(0)) {
      this.users = this.allUsers;
    } else {
      this.users = [];
      for (let i = 0; i < this.allUsers.length; i++) {
        console.log(this.allUsers[i].disabled);
        if (String(this.allUsers[i].roleId) === event) {
          this.users.push(this.allUsers[i]);
        }
      }
    }
  }

  searchUser = (userName: string) => {
    if (userName === "") {
      this.users = this.allUsers;
    } else {
      this.users = [];
      for (let i = 0; i < this.allUsers.length; i++) {
        if (String(this.allUsers[i].username) === userName) {
          this.users.push(this.allUsers[i]);
        }
      }
    }
  }

  onEdit = () => {
    this.userService.editUser(this.user)
    .subscribe((res) => {
      this.refreshUser();
    });
    this.user={} as any;
  }

  onSubmit = (myForm: NgForm) => {
    //console.log(myForm.value);
    this.userService.addUser(myForm.value)
      .subscribe((res) => {
        console.log(res);
        this.refreshUser();
        this.toggleAdd();
        myForm.reset();
      },
      (err) => {
        this.isError = true;
        this.errorMessage = err;
        this.refreshUser();
      }
      );
  }

  editUser = (userId: number, id: Modal) => {
    this.user = {"userId":userId, "password": this.user.password};
    id.open();    
  }

  deleteUser = (value: User) => {
    this.userService.deleteUser(value.userId)
      .subscribe((res) => {
        console.log(res);
        this.refreshUser();
      },
      error => {
        this.isError = true;
        this.errorMessage = error;
      });
  }

  enableUser = (userId) => {
    this.userService.enableUser(userId)
      .subscribe(
      data => {
        this.refreshUser();
      },
      (err) => {
        this.isError = true;
        this.errorMessage = err;
        this.refreshUser();
      }
      );
  }

  disableUser = (userId, disableReason) => {
    this.userService.disableUser(userId, disableReason)
    .subscribe(
    data => {
      this.refreshUser();
    },
    (err) => {
      this.isError = true;
      this.errorMessage = err;
      this.refreshUser();
    }
    );
  }

  refreshUser = () => {
    this.users = [];
    this.allUsers = [];
    this.userService.getUsers()
      .subscribe(
      data => {
        data.forEach(element => {
          if (element.status === "disabled") {
            let user = new User(element.userId, element.username, element.role.roleName, element.role.roleId, true, element.operationReason);
            this.allUsers.push(user);            
          } else {
            let user = new User(element.userId, element.username, element.role.roleName, element.role.roleId, false, null);
            this.allUsers.push(user);            
          }
        });
        this.users = this.allUsers;
      });
  }


}
