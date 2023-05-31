
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../model/User.model';
import { UserService } from '../service/user.service';
import { Role } from '../model/Role.model';
import { AuthServiceService } from '../service/auth-service.service';
@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.scss']
})
export class MyDetailsComponent {
  users!:User[];
  user!: User;
constructor( private messageService: MessageService, private confirmationService: ConfirmationService, private userService : UserService,private authService: AuthServiceService ) {}


// show the role only 
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

onRowEditCancel(user: User) {
 
}

onRowEditSave(user: User) {
  if (this.user.user_id) {
    this.userService.updateUser(this.user).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Updated', life: 3000 });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update Role', life: 3000 });
      }
      );
}
}
}

