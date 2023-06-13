
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../model/User.model';
import { UserService } from '../service/user.service';
import { Role } from '../model/Role.model';
import { AuthServiceService } from '../service/auth-service.service';
import { Passport } from '../model/Passport.model';
import { VisaService } from '../service/visa.service';
@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.scss']
})
export class MyDetailsComponent {
  passports: Passport[] = [];
  roles: Role[] = [];
  userDialog!: boolean;
  users!: User[];
  user!: User;
  selectedUsers!: User[];
  submitted: boolean = false;
  
  constructor( private messageService: MessageService, private confirmationService: ConfirmationService, private userService : UserService , private visaService : VisaService , private authService:AuthServiceService ) {
  this.selectedUsers = [];
  
  }



displayRoles(roles: Role[]): string {
  return roles.map(role => role.role).join(', ');
}

ngOnInit() {
  this.getUserDetails();
  

}
onRowEditInit(user: User) {
  this.user = { ...user };
}

getUserDetails(): void {
  const username = this.authService.loggedUser;
  if (username) {
    this.userService.getUserByname(username).subscribe(user => {
      this.users = [user];  
      console.log(this.user);
    }, error => {
      console.log(error);
    });
  }
}

openNew() {
this.user = new User();
this.user.roles = []; // initialize roles to an empty array
this.user.passport = new Passport() 
this.userDialog = true;
}

editUser(user: User) {
this.user = { ...user };
// If user.passport or user.roles are null or undefined, initialize them to reasonable default values
if (!this.user.passport) {
  this.user.passport = new Passport(); // assign a blank passport
}
if (!this.user.roles) {
  this.user.roles = []; // initialize roles to an empty array
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
          // Don't include the password when updating
          delete userToSend.password;  

          if (this.user.user_id) {
              this.userService.updateUser(userToSend).subscribe(
                  response => {
                      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
                      this.getUserDetails();
                      this.users = [...this.users]; 
                      this.userDialog = false;
                      this.user = new User();
                  },
                  error => {
                      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update User', life: 3000 });
                  }
              );
          } 
      }
  }
}

hideDialog() {
this.userDialog = false;
}





}

