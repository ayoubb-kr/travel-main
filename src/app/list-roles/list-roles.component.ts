import { Component } from '@angular/core';
import { Role } from '../model/Role.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent {
  roles!: Role[];
  role!: Role;
  roleDialog!: boolean;
  selectedroles!: Role[];
  submitted: boolean = false;
constructor( private messageService: MessageService, private confirmationService: ConfirmationService, private userService : UserService ) {
  this.selectedroles = [];
  
}
ngOnInit() {
  this.chargerole();
}
chargerole(){
this.userService.getRoles().subscribe(role => {
  console.log(this.role);
  this.roles= role;
    });
}

openNew() {
  this.role = new Role();
  this.roleDialog = true;

}

deleteSelectedRoles() {
  
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete the selected Passports?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      
       this.selectedroles.forEach(role => {
        this.userService.deleterole(role.role_id as number).subscribe(response => {
          // On successful deletion from the backend, remove the role from the local passport array
          this.roles = this.roles.filter(val => val.role_id !== role.role_id);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Deleted', life: 3000 });
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete Role', life: 3000 });
        });
      });
      // Clear the selected passports
      this.selectedroles = [];
    }
  });
  
}

editRole(role: Role) {
  this.role = { ...role };
  this.roleDialog = true;

}

hideDialog() {
  this.roleDialog = false;
  this.submitted = false;
}

deleteRole(role: Role) {
  
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + role.role + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (typeof role.role_id === 'number') {
        this.userService.deleterole(role.role_id).subscribe(response => {
          this.roles= this.roles.filter(val => val.role_id !== role.role_id);
          this.role = new Role();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Role Deleted', life: 3000});
        }, error => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to delete Role', life: 3000});
        });
      }
    }
  });
  
}


saveRole() {
  
  this.submitted = true;

  if (this.role.role!.trim() ) {

   // check if role with same name already exists
   const roleExists = this.roles.some(existingRole => existingRole.role.toUpperCase() === this.role.role.toUpperCase());
   if (roleExists) {
     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Role already exists', life: 3000 });
     return;
   }

    if (this.role.role_id) {
      this.userService.updateRole(this.role).subscribe(
        response => {
          this.chargerole();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role updated', life: 3000 });
    },error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update Role', life: 3000 });
    }
    );
  } else {
    this.userService.saveRole(this.role).subscribe(
      response => {
        this.chargerole();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Added', life: 3000 });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Role', life: 3000 });
      }
    );
  }
};
this.chargerole();
this.roles = [...this.roles];
this.roleDialog = false;
this.role = new Role();
}

}
