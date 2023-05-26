import { Component } from '@angular/core';
import { Passport } from '../model/Passport.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VisaService } from '../service/visa.service';

@Component({
  selector: 'app-list-passport',
  templateUrl: './list-passport.component.html',
  styleUrls: ['./list-passport.component.scss']
})
export class ListPassportComponent {
  passports!: Passport[];
  passport!: Passport;
  passDialog!: boolean;
  updateDialog!: boolean;
  selectedPassports!: Passport[];
  submitted: boolean = false;
constructor( private messageService: MessageService, private confirmationService: ConfirmationService, private visaService : VisaService ) {
  this.selectedPassports = [];
  
}
ngOnInit() {
  this.chargepass();
}
chargepass(){
this.visaService.listePass().subscribe(passport => {
  console.log(this.passport);
  this.passports= passport;
    });
}

openNew() {
  this.passport = new Passport();
  this.passDialog = true;

}

deleteSelectedPass() {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete the selected Passports?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      // Iterating over all selected passport
      this.selectedPassports.forEach(passport => {
        this.visaService.deletePass(passport.idPass).subscribe(response => {
          // On successful deletion from the backend, remove the passport from the local passport array
          this.passports = this.passports.filter(val => val.idPass !== passport.idPass);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Passport Deleted', life: 3000 });
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete Passport', life: 3000 });
        });
      });
      // Clear the selected passports
      this.selectedPassports = [];
    }
  });
}

editPass(passport: Passport) {
  this.passport = { ...passport };
  this.updateDialog = true;
}

hideDialog() {
  this.passDialog = false;
  this.submitted = false;
  this.updateDialog = false;
}

deletePass(passport: Passport) {/*
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



savePass() {
  this.submitted = true;

  if (!this.passport.idPass || !this.passport.passExpDate) {
      // either idPass or passExpDate is empty, so don't proceed
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'idPass and date can not be empty.', life: 3000 });
      return;
  }
  const existingPassport = this.passports.find(p => p.idPass === this.passport.idPass);
  if (existingPassport) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'idPass already exists. Cannot add a new passport.', life: 3000 });
  } else {
      this.visaService.savePass(this.passport).subscribe(
          response => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Passport Added', life: 3000 });
          },
          error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Passport', life: 3000 });
          }
      );
  };

  this.passDialog = false;
  this.passport = new Passport();
  this.passports = [...this.passports];
}

updatePass() {
  this.visaService.updatePass(this.passport).subscribe(
    response => {
      
      const index = this.passports.findIndex(p => p.idPass === this.passport.idPass);
      this.passports[index] = this.passport;
      
      this.passports = [...this.passports];

      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Passport Updated', life: 3000 });
      this.updateDialog = false;
      this.passport = new Passport();
    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update Passport', life: 3000 });
    }
  );
}


}
