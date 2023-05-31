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
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/app/Dashbord'], roles: ['ADMIN', 'USER'] }
                ]
            },
            {
                label: '',
                items: [
               
                    { label: 'Table Users', icon: 'pi pi-fw pi-table', routerLink: ['/app/table'], roles: ['ADMIN'] },
                    { label: 'List Visa', icon: 'pi pi-fw pi-list', routerLink: ['/app/list-visa'], roles: ['ADMIN', 'USER'] },
                    { label: 'list passport', icon: 'pi pi-fw pi-database', routerLink: ['/app/list-passport'] ,roles: ['ADMIN','USER'] },
                    { label: 'Roles', icon: 'pi pi-fw pi-users', routerLink: ['/app/list-roles'] , roles: ['ADMIN'] },
                    { label: 'My Details', icon: 'pi pi-fw pi-user', routerLink: ['/app/my-details'] , roles: ['USER'] },
                    { label: 'My Passport',  icon:'pi pi-fw pi-id-card', routerLink: ['/app/my-passport'] , roles: ['USER'] },
                    { label: 'Request',  icon:'pi pi-fw pi-file-import', routerLink: ['/app/request'] , roles: ['ADMIN','USER'] },
                    { label: 'mission',  icon:'pi pi-fw pi-briefcase', routerLink: ['/app/mission'] , roles: ['ADMIN','USER'] },
                    
                ]
            },
            {
                label: '',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                   
                            {
                                label: 'Logout',
                                icon: 'pi pi-fw pi-sign-out',
                                command: () => this.logout(),
                                roles: ['ADMIN', 'USER', 'TRAVEL_MANAGER']
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
