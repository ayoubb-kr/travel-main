import { Component } from '@angular/core';
import { User } from '../model/User.model';
import { UserService } from '../service/user.service';
import { VisaService } from '../service/visa.service';
import { Visa } from '../model/Visa.model';
import { Passport } from '../model/Passport.model';
import { MissionRequestService } from '../service/MissionRequest.service';
import { MissionRequest } from '../model/MissionRequest.model';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent {
  users!: User[];
  user!: User;
  visa!:Visa;
  visas!:Visa[];
  passports!: Passport[];
  passport!: Passport;
  missions!:MissionRequest[];
  mission!:MissionRequest;
  constructor( private userService : UserService , private visaService : VisaService, private missionRequestService: MissionRequestService ) {
 
    
  }
  ngOnInit() {
    this.chargedata();
    this.chargevisa();
    this.chargepass();
    this.chargemission();
  } 

  chargedata(){
    this.userService.ListUsers().subscribe(user => {
      console.log(User);
      this.users= user;
        });
  }
  chargevisa(){
    this.visaService.ListVisa().subscribe(visa => {
      console.log(visa);
      this.visas= visa;
        });
    }


  
  chargepass(){
  this.visaService.listePass().subscribe(passport => {
    this.passports= passport;
      });
  }

  chargemission(){
    this.missionRequestService.ListMissionreq().subscribe(mission => {
      this.missions = mission ; 
    } )
  }

  
}
