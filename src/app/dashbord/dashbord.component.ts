import { Component } from '@angular/core';
import { User } from '../model/User.model';
import { UserService } from '../service/user.service';
import { VisaService } from '../service/visa.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent {
  users!: User[];
  user!: User;
  constructor( private userService : UserService , private visaService : VisaService ) {
 
    
  }
  ngOnInit() {
    this.chargedata();

  } 

  chargedata(){
    this.userService.ListUsers().subscribe(user => {
      console.log(User);
      this.users= user;
        });
  }
}
