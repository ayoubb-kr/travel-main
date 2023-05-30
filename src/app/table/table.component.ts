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

    roles: Role[] = [];
    userDialog!: boolean;
    users!: User[];
    user!: User;
    selectedUsers!: User[];
    submitted: boolean = false;
    
  constructor( private messageService: MessageService, private confirmationService: ConfirmationService, private userService : UserService ) {
    this.selectedUsers = [];
    
  }
  // show the role only 
  displayRoles(roles: Role[]): string {
    return roles.map(role => role.role).join(', ');
  }

  ngOnInit() {
    this.chargedata();
     this.userService.getRoles().subscribe(
    data => this.roles = data,
    error => console.error(error)
  );
  }

chargedata(){
  this.userService.ListUsers().subscribe(user => {
    console.log(User);
    this.users= user;
      });
}


openNew() {
    this.user = new User();
    this.userDialog = true;
    
  }
 
  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Iterating over all selected users
        this.selectedUsers.forEach(user => {
          this.userService.deleteUser(user.user_id as number).subscribe(response => {
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
 
  deleteUser(user: User) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + user.username + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            if (typeof user.user_id === 'number') {
                this.userService.deleteUser(user.user_id).subscribe(response => {
                    this.users = this.users.filter(val => val.user_id !== user.user_id);
                    this.user = new User();
                    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Role Deleted', life: 3000});
                }, error => {
                    this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to delete Role', life: 3000});
                });
            }
        }
    });
}

  hideDialog() {
    this.userDialog = false;
  }

    saveUser() {
      this.submitted = true;
    
      if (this.user.username!.trim() && this.user.password!.trim()) {
        if (this.user.user_id) {
            this.userService.updateUser(this.user).subscribe(
              response => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Updated', life: 3000 });
              },
              error => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update Role', life: 3000 });
              }
            );
          } else {
            this.userService.saveUser(this.user).subscribe(
              response => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Added', life: 3000 });
              },
              error => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Role', life: 3000 });
              }
            );
          }
        };
      
      this.users = [...this.users];
      this.userDialog = false;
      this.user = new User();
    }


}
