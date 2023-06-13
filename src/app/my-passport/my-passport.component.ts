import { Component, ElementRef } from '@angular/core';
import { Passport } from '../model/Passport.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VisaService } from '../service/visa.service';
import { User } from '../model/User.model';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-passport',
  templateUrl: './my-passport.component.html',
  styleUrls: ['./my-passport.component.scss']
})
export class MyPassportComponent {
  passports!: Passport[];
  passport!: Passport;
  updateDialog!: boolean;
  submitted: boolean = false;
  user!: User;
  userRoles: string[] = [];
constructor( private el: ElementRef,private messageService: MessageService, private confirmationService: ConfirmationService, private visaService : VisaService ,  private userService : UserService, private router: Router ) {
 
}
ngOnInit() {
  this.userService.getLoggedUserData().subscribe(user => {
    if (user) {
      this.user = user;
      this.getPassportDetails();
    } 
  });
  
}

getPassportDetails(): void {
  const userId = this.user.user_id;
  if (userId) {
    this.visaService.getPassportByUserId(userId).subscribe(passport => {
      this.passport = passport;
      // if passport is null, passports become an empty array
      this.passports = this.passport ? [this.passport] : []; 
      console.log(this.passports);
  }, error => {
      console.log(error);
  });
}
console.log("Before sending to server: ", this.passport.passExpDate);
}

editPass(passport: Passport) {
  this.passport = { ...passport };
  this.updateDialog = true;
}

hideDialog() {
  this.submitted = false;
  this.updateDialog = false;
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
