import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Visa } from '../model/Visa.model';
import { VisaService } from '../service/visa.service';
import { Passport } from '../model/Passport.model';

@Component({
  selector: 'app-list-visa',
  templateUrl: './list-visa.component.html',
  styleUrls: ['./list-visa.component.scss']
})
export class ListVisaComponent {
  visas!: Visa[];
  visa!: Visa;
  visaDialog!: boolean;
  selectedVisas!: Visa[];
  submitted!: boolean;
 
constructor( private messageService: MessageService, private confirmationService: ConfirmationService, private visaService : VisaService ) {
  this.selectedVisas = [];
  
}

ngOnInit() {
  this.chargevisa();
}
chargevisa(){
this.visaService.ListVisa().subscribe(visa => {
  console.log(visa);
  this.visas= visa;
    });
}

openNew() {/*
  this.user = {};
  this.submitted = false;
  this.userDialog = true;
  */
}



deleteSelectedVisa() {
  /*
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
  */
}

editVisa(visa: Visa) {
  this.visa = { ...visa };
  this.visaDialog = true;
}

deleteVisa(visa: Visa) {/*
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
  this.visaDialog = false;
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
/*
findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.visas.length; i++) {
      if (this.visas[i].idVisa === id) {
          index = i;
          break;
      }
  }

  return index;
}
*/
}
