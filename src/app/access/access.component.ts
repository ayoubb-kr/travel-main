import { Component } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-access',
    templateUrl: './access.component.html',
})
export class AccessComponent { 

    constructor(private authService : AuthServiceService,private router: Router) { }

        ngOnInit(): void {
        }

        check()
    {
        const userRoles = this.authService.getUserRoles();
    
        // If user has ADMIN, TRAVEL_MANAGER, AGENT_RH, or TEAM_LEADER roles, navigate to Dashbord.
        if (userRoles.some((role: string) => ['ADMIN','TRAVEL_MANAGER','AGENT_RH','TEAM_LEADER'].includes(role))) {
          this.router.navigate(['/app/Dashbord']); 
        } 
        // If user has USER role, navigate to my-details.
        else if (userRoles.includes('USER')) {
          this.router.navigate(['/app/my-details']); 
        }
  
      }

}
