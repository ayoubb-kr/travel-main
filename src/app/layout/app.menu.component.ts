import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private authService : AuthServiceService) { }
    logout() {
        this.authService.logout();
    }
    ngOnInit() {
        this.model = [
            {
                label: '',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/app'], roles: ['ADMIN', 'USER'] }
                ]
            },
            {
                label: '',
                items: [
               
                    { label: 'Table Users', icon: 'pi pi-fw pi-table', routerLink: ['/app/table'], roles: ['ADMIN'] },
                    { label: 'List Visa', icon: 'pi pi-fw pi-list', routerLink: ['/app/list-visa'], roles: ['ADMIN', 'USER'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/app/list-passport'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                  

                ]
            },
            {
                label: '',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                   
                            {
                                label: 'Logout',
                                icon: 'pi pi-fw pi-sign-out',
                                command: () => this.logout()
                            },
                ]
            },
            
        ];
    }
    hasRole(roles: string[]): boolean {
        const userRoles = this.authService.roles;
        return roles.some(role => userRoles.includes(role));
    }
}
