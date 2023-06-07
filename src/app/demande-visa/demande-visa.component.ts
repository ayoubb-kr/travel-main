
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VisaService } from '../service/visa.service';
import { Passport } from '../model/Passport.model';
import { Status, VisaRequest } from '../model/VisaRequest.model';
import { VisaRequestService } from '../service/visarequest.service.service';
@Component({
  selector: 'app-demande-visa',
  templateUrl: './demande-visa.component.html',
  styleUrls: ['./demande-visa.component.scss']
})
export class DemandeVisaComponent {
  passports: Passport[] = [];
  visaRequestDialog!: boolean;
  visaRequests!: VisaRequest[];
  visaRequest!: VisaRequest;
  selectedVisaRequests!: VisaRequest[];
  submitted: boolean = false;
  statuses = Object.values(Status);
 
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private visaRequestService: VisaRequestService ,  private visaService : VisaService) {
    this.selectedVisaRequests = [];
  }

  ngOnInit() {
    this.loadData();
    this.listPassports();
  }

listPassports() { 
  this.visaService.listePass().subscribe(
    passports => this.passports = passports,
    error => console.error('There was an error!', error)
  );
}
loadData() {
  this.visaRequestService.ListVisareq().subscribe(visaRequests => {
    console.log(VisaRequest);
    this.visaRequests = visaRequests;
  });
}
openNew() {
  this.visaRequest = new VisaRequest();
  this.visaRequest.passport = new Passport() 
  this.visaRequestDialog = true;
}



editVisaRequest(visaRequest: VisaRequest) {
  this.visaRequest = { ...visaRequest };
  this.visaRequestDialog = true;
}



hideDialog() {
  this.visaRequestDialog = false;
}

saveVisaRequest() {
  this.submitted = true;

  if (this.visaRequest.type.trim() && this.visaRequest.destination.trim()) {
    if (this.visaRequest.id) {
      this.visaRequestService.updateVisaRequest(this.visaRequest)
        .subscribe(() => {
          this.loadData();
          this.visaRequestDialog = false;
          this.messageService.add({severity:'success', summary:'Successful', detail:'Visa Request Updated', life: 3000});
        });
    } else {
      this.visaRequestService.addVisaRequest(this.visaRequest)
        .subscribe(() => {
          this.loadData();
          this.visaRequestDialog = false;
          this.messageService.add({severity:'success', summary:'Successful', detail:'Visa Request Created', life: 3000});
        });
    }
  }
}
  
  
    
deleteVisaRequest(visaRequest: VisaRequest) {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete this Visa Request?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        if (visaRequest.id !== undefined) {
      this.visaRequestService.deleteVisaRequest(visaRequest.id).subscribe(() => {
        this.loadData();
        this.messageService.add({severity:'success', summary:'Successful', detail:'Visa Request Deleted', life: 3000});
      });
    }}
  });
}

deleteSelectedVisaRequests() {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete the selected Visa Requests?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.selectedVisaRequests.forEach(visaRequest => {
        // Ensure visaRequest.id is defined before calling deleteVisaRequest()
        if (visaRequest.id !== undefined) {
          this.visaRequestService.deleteVisaRequest(visaRequest.id).subscribe(() => {
            this.loadData();
            this.messageService.add({severity:'success', summary:'Successful', detail:'Visa Request Deleted', life: 3000});
          });
        }
      });

      this.selectedVisaRequests = [];
    }
  });
}
    

}
