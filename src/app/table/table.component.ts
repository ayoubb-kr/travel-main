import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../model/User.model';
import { UserService } from '../service/user.service';
import { Role } from '../model/Role.model';
import { VisaService } from '../service/visa.service';
import { Passport } from '../model/Passport.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  passports: Passport[] = [];
    roles: Role[] = [];
    userDialog!: boolean;
    users!: User[];
    user!: User;
    selectedUsers!: User[];
    submitted: boolean = false;
    
  constructor( private messageService: MessageService, private confirmationService: ConfirmationService, private userService : UserService , private visaService : VisaService ) {
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
 this.listePass();
  }
  listePass(){ 
  this.visaService.listePass().subscribe(
    passports => this.passports = passports,
    error => console.error('There was an error!', error)
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
  this.user.roles = []; // initialize roles to an empty array
  this.user.passport = new Passport() 
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
    
    this.user = { ...user, password: '' };

    if (!this.user.passport) {
      this.user.passport = new Passport(); // assign a blank passport
    }
    this.userDialog = true;
  }
  saveUser() {
    this.submitted = true;

    if (this.user.username!.trim()) {
        // Only check for unique passport id if idPass is defined.
        if (this.user.passport?.idPass && this.users.some(existingUser => existingUser.user_id !== this.user.user_id && existingUser.passport?.idPass === this.user.passport?.idPass)) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Passport ID already exists in another user', life: 3000 });
        }
        else {
          let userToSend = JSON.parse(JSON.stringify(this.user));
          if (!userToSend.passport?.idPass) {
                delete userToSend.passport;
            }
           if (!userToSend.password || userToSend.password === '') {
                delete userToSend.password;
                }

            if (this.user.user_id) {
                this.userService.updateUser(userToSend).subscribe(
                    response => {
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
                        this.chargedata();
                        this.users = [...this.users]; 
                        this.userDialog = false;
                        this.user = new User();
                    },
                    error => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update User', life: 3000 });
                    }
                );
            } else {
                this.userService.saveUser(userToSend).subscribe(
                    response => {
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Added', life: 3000 });
                        this.chargedata();
                        this.users = [...this.users]; 
                        this.userDialog = false;
                        this.user = new User();
                    },
                    error => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add User', life: 3000 });
                    }
                );
            }
        }
    }
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
                    this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
                }, error => {
                    this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to delete User', life: 3000});
                });
            }
        }
    });
}

  hideDialog() {
    this.userDialog = false;
  }

  


}
