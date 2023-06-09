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
  onActiveIndexChange(event: any) {
    this.activeIndex = event;
}
  ngOnInit() {
      this.items = [
          {
              label: 'User Details',
              routerLink: 'step1',
              command: (event: any) => this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label})
          },
          {
              label: 'Seat',
              routerLink: 'step2',
              command: (event: any) => this.messageService.add({severity:'info', summary:'Second Step', detail: event.item.label})
          },
          {
              label: 'Payment',
              routerLink: 'step3',
              command: (event: any) => this.messageService.add({severity:'info', summary:'Third Step', detail: event.item.label})
          },
         
      ];

    
        
    
  }
}