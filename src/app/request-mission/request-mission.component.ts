import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-request-mission',
  templateUrl: './request-mission.component.html',
  styleUrls: ['./request-mission.component.scss']
})
export class RequestMissionComponent {
  items!: MenuItem[];
  
  activeIndex: number = 0;
  constructor(private messageService: MessageService) {}

  ngOnInit() {
      this.items = [
          {
              label: 'User Details',
              routerLink: 'step1',
             
          },
          {
              label: 'Visa and Mission details',
              routerLink: 'step2',
          },
          {
              label: 'Confirmation',
              routerLink: 'step3',
          },
         
      ];

    
        
    
  }
}