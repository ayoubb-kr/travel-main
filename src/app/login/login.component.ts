import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { User } from '../model/User.model';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { MessageService } from 'primeng/api';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit{
    user = new User();
    err : number = 0;

    valCheck: string[] = ['remember'];
    password!: string;

    constructor(public layoutService: LayoutService, private authService : AuthServiceService,private messageService: MessageService,
        private router: Router) { }
    ngOnInit(): void {
    }
    onLoggedin()
    {
      this.authService.login(this.user).subscribe({
        next: (data) => {
          console.log("this is datta token",data)
          let jwToken = data.headers.get('Authorization')!;
          this.authService.saveToken(jwToken);
           this.router.navigate(['/app/']); 

        },
        error: (err: any) => {
        this.err = 1;
        this.messageService.add({
            severity: 'error',
            summary: 'Login Error',
            detail: 'Incorrect username or password'
          });
       }
        });
    }
}



