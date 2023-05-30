import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component'; 
import { TableComponent } from './table/table.component';
import { LoginComponent } from './login/login.component';
import { AccessComponent } from './access/access.component';
import { ListVisaComponent } from './list-visa/list-visa.component';
import { ListPassportComponent } from './list-passport/list-passport.component';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { AuthGuard } from './auth/auth.guard'; 
import { LoginGuard } from './auth/login.guard'; 
import { RoleGuardService } from './guards/role-guard.service';
import { ErrorComponent } from './error/error.component';
const routes: Routes = [
  { path: '', component: LoginComponent , canActivate: [LoginGuard]},
  { path: 'app', component: AppLayoutComponent,  canActivate: [AuthGuard],children: [
      { path: 'table', component: TableComponent ,canActivate: [RoleGuardService],
      data: { roles: ['ADMIN'] }},
      { path: 'acces', component: AccessComponent },
      { path: 'list-visa', component: ListVisaComponent },
      { path: 'list-passport', component: ListPassportComponent },
      { path: 'list-roles', component: ListRolesComponent },
      { path: 'error', component: ErrorComponent },
    ]
  },
  { path: 'login', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: 'app/error' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
