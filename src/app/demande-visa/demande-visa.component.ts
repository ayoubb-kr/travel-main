
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Visa } from '../model/Visa.model';
import { VisaService } from '../service/visa.service';
import { Passport } from '../model/Passport.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-demande-visa',
  templateUrl: './demande-visa.component.html',
  styleUrls: ['./demande-visa.component.scss']
})
export class DemandeVisaComponent {
  passports: Passport[] = [];
  visas!: Visa[];
  visa!: Visa;
  visaDialog!: boolean;
  selectedVisas!: Visa[];
  submitted: boolean = false;
  updateDialog!: boolean;
 
constructor( private messageService: MessageService, private confirmationService: ConfirmationService, private visaService : VisaService ) {
  this.selectedVisas = [];
  this.visa = new Visa();
  this.visa.passport = new Passport();
}

ngOnInit() {
  this.chargevisa();
  this.visaService.listePass().subscribe(
    passports => this.passports = passports,
    error => console.error('There was an error!', error)
  );
}
chargevisa(){
  /*
this.visaService.ListVisa().subscribe(visa => {
  console.log(visa);
  this.visas= visa;
    });
    */
}

openNew() {
  this.visa = new Visa();
  this.visa.passport = this.visa.passport || new Passport(); 
  this.visa.passport.idPass = this.visa.passport.idPass;
  this.visaDialog = true;
}




editVisa(visa: Visa) {
  this.visa = { ...visa };
  this.updateDialog= true;

}

deleteVisa(visa: Visa) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + visa.idVisa + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.visaService.deleteVisa(visa.idVisa).subscribe(response => {
          this.visas = this.visas.filter(val => val.idVisa !== visa.idVisa);
          this.visa = new Visa();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Visa Deleted', life: 3000});
        }, error => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to delete Visa', life: 3000});
        });
    }
  });
}

hideDialog() {
  this.visaDialog = false;
  this.submitted = false;
  this.updateDialog = false;
}

saveVisa() {

  this.visaService.saveVisa(this.visa).subscribe(
        response => {
          console.log('Visa saved successfully!');
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Visa Added', life: 3000 });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Visa', life: 3000 });
          console.error('There was an error!', error);
        }
      );
      this.visaDialog = false;
      this.visa = new Visa();
      this.visas = [...this.visas];
      this.visa.passport = {idPass: ''};
    }
  
    updatePass() {
  
      this.visaService.updateVisa(this.visa).subscribe(
        response => {
          
          const index = this.visas.findIndex(v => v.idVisa === this.visa.idVisa);
          this.visas[index] = this.visa;
          
          this.visas = [...this.visas];
    
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Passport Updated', life: 3000 });
          this.updateDialog= false;
          this.visa = new Visa();
          this.visa.passport = {idPass: ''};
           
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update Passport', life: 3000 });
        }
      );
    }
  

    deleteSelectedVisa() {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected users?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          // Iterating over all selected visa
          this.selectedVisas.forEach(visa => {
            // Calling deleteVisa() to send a DELETE request to your backend API
            this.visaService.deleteVisa(visa.idVisa).subscribe(response => {
              // On successful deletion from the backend, remove the user from the local users array
              this.visas = this.visas.filter(val => val.idVisa !== visa.idVisa);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
            }, error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete User', life: 3000 });
            });
          });
          // Clear the selected users
          this.selectedVisas = [];
        }
      });
    }
    

}
