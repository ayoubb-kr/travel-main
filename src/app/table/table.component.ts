import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../model/User.model';
import { UserService } from '../service/user.service';
import { Role } from '../model/Role.model';

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
    newidCat! : number;
    
  constructor( private messageService: MessageService, private confirmationService: ConfirmationService, private userService : UserService ) {
    this.selectedUsers = [];
    
  }
  // Function in your component class
  displayRoles(roles: Role[]): string {
    return roles.map(role => role.role).join(', ');
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
        // Iterating over all selected users
        this.selectedUsers.forEach(user => {
          // Calling supprimerUser() to send a DELETE request to your backend API
          this.userService.supprimerUser(user.user_id as number).subscribe(response => {
            // On successful deletion from the backend, remove the user from the local users array
            this.users = this.users.filter(val => val.user_id !== user.user_id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete User', life: 3000 });
          });
        });
        // Clear the selected users
        this.selectedUsers = [];
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
