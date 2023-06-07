import { Component } from '@angular/core';
import { Visa } from '../model/Visa.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../service/user.service';
import { AuthServiceService } from '../service/auth-service.service';
import { VisaService } from '../service/visa.service';
import { Passport } from '../model/Passport.model';
import { User } from '../model/User.model';

@Component({
  selector: 'app-my-visa',
  templateUrl: './my-visa.component.html',
  styleUrls: ['./my-visa.component.scss']
})
export class MyVisaComponent {
  visas!:Visa[];
  visa!: Visa;
  user!: User;
constructor( private messageService: MessageService, private confirmationService: ConfirmationService, private userService : UserService,private authService: AuthServiceService , private visaService: VisaService  ) {}




ngOnInit(): void {
  this.userService.getLoggedUserData().subscribe(user => {
    if (user) {
      this.user = user;
      this.getVisaByIdpass();
    } 
  });
}

getVisaByIdpass(): void{
  const passportId = this.user.passport.idPass;
  if (passportId) {

    this.visaService.getVisaByIdpass(passportId)
    .subscribe((response: any) => {
      const visaArray: Visa[] = response as Visa[];
      console.log(visaArray);
      this.visa = visaArray[0];  
      this.visas = visaArray;  
      console.log('Visas: ', this.visas);
    }, error => {
      console.log(error);
  });
    
}

}




onRowEditInit(visa: Visa) {
  this.visa = { ...visa };
}

}
