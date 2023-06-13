import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthServiceService } from '../service/auth-service.service';
import { UserService } from '../service/user.service';
import { Role } from '../model/Role.model';

interface MenuItem {
    label: string;
    icon?: string;
    routerLink?: string[];
    roles?: string[];
    items?: MenuItem[];
    command?: () => void;
}

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    

    constructor(public layoutService: LayoutService, private authService : AuthServiceService ,private userService : UserService ) { }
    logout() {
        this.authService.logout();
    }
    ngOnInit() {
        const userRoles = this.authService.getUserRoles();
          
        this.model = [
            {
                label: '',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/app/Dashbord'], roles: ['ADMIN','TRAVEL_MANAGER','AGENT_RH','TEAM_LEADER'] }
                ]
            },
            {
                label: '',
                items: [
                    { label: 'My Details', icon: 'pi pi-fw pi-user', routerLink: ['/app/my-details'] , roles: ['USER','TRAVEL_MANAGER','AGENT_RH','TEAM_LEADER'] },
                    { label: 'My Passports',  icon:'pi pi-fw pi-id-card', routerLink: ['/app/my-passport'] , roles: ['USER', 'TRAVEL_MANAGER','AGENT_RH','TEAM_LEADER'] },
                    { label: 'My Visas',  icon:'pi pi-fw pi-file', routerLink: ['/app/my-visa'] , roles: ['USER', 'TRAVEL_MANAGER','AGENT_RH','TEAM_LEADER'] },
                    { label: 'My mission',  icon:'pi pi-fw pi-folder-open', routerLink: ['/app/my-mission'] , roles: ['USER', 'TRAVEL_MANAGER','AGENT_RH','TEAM_LEADER'] },

                    { label: 'Table Users', icon: 'pi pi-fw pi-table', routerLink: ['/app/table'], roles: ['ADMIN'] },
                    { label: 'List Visas', icon: 'pi pi-fw pi-list', routerLink: ['/app/list-visa'], roles: ['ADMIN', 'TRAVEL_MANAGER','AGENT_RH'] },
                    { label: 'list passports', icon: 'pi pi-fw pi-database', routerLink: ['/app/list-passport'] ,roles: ['ADMIN', 'TRAVEL_MANAGER','AGENT_RH'] },
                    { label: 'Roles', icon: 'pi pi-fw pi-users', routerLink: ['/app/list-roles'] , roles: ['ADMIN'] },

                
                    { label: 'Visa Request',  icon:'pi pi-fw pi-file-import', routerLink: ['/app/request'] , roles: ['ADMIN','TRAVEL_MANAGER','AGENT_RH'] },
                    { label: 'Mission Request',  icon:'pi pi-fw pi-briefcase', routerLink: ['/app/mission'] , roles: ['ADMIN','TRAVEL_MANAGER','TEAM_LEADER'] },
                    { label: 'Mission List',  icon:'pi pi-fw pi-bars', routerLink: ['/app/table-mission'] , roles: ['ADMIN','TRAVEL_MANAGER','TEAM_LEADER'] },
                    
                ]
            },
            {
                label: '',
                items: [
                   
                            {
                                label: 'Logout',
                                icon: 'pi pi-fw pi-sign-out',
                                command: () => this.logout(),
                                roles: ['ADMIN', 'USER', 'TRAVEL_MANAGER','AGENT_RH','TEAM_LEADER']
                            },
                ]
            },
            
        ];
        // Filter the model based on the user's role
        this.model.forEach((menu: MenuItem) => {
            menu.items = menu.items?.filter((item: MenuItem) => item.roles?.some(role => userRoles.includes(role)));
        });
    }
   
   
}
