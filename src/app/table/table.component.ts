import { Component } from '@angular/core';
import { MasterService } from 'src/app/service/master.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../model/User.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

    userDialog!: boolean;
    users!: User[];
    user!: User;
    selectedUsers!: User[];
    submitted!: boolean;
  
    
  constructor(private productService: MasterService, private messageService: MessageService, private confirmationService: ConfirmationService, private userService : UserService ) {
    this.selectedUsers = [];
  }

  ngOnInit() {
    this.chargedata();
  }
chargedata(){
  this.userService.ListUsers().subscribe(user => {
    console.log(User);
    this.users= user;
      });
}

get obfuscatedPassword(): string {
  return this.user.password.replace(/./g, '*');
}

set obfuscatedPassword(value: string) {
  this.user.password = value.replace(/\*/g, '');
}

openNew() {/*
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
    */
  }
 
 
 
  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter(val => !this.selectedUsers.includes(val));
        this.selectedUsers = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
      }
    });
  }
  
  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }
 
  deleteUser(user: User) {/*
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + user.username + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.users = this.users.filter(val => val.id !== user.id);
            this.user = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
        }
    });*/
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }
 
  saveUser() {/*
    this.submitted = true;

    if (this.user.username!.trim() && this.user.password!.trim()) {
        if (this.user.id) {
            this.users[this.findIndexById(this.user.id)] = this.user;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Updated', life: 3000});
        }
        else {
           
            this.users.push(this.user);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Created', life: 3000});
        }

        this.users = [...this.users];
        this.userDialog = false;
        this.user = {};
    }*/
  }
 
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].user_id === id) {
            index = i;
            break;
        }
    }

    return index;
  }
 
}
