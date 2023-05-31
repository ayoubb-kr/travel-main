import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component'; 
import { TableComponent } from './table/table.component';
import { LoginComponent } from './login/login.component';
import { AccessComponent } from './access/access.component';
import { ListVisaComponent } from './list-visa/list-visa.component';
import { ListPassportComponent } from './list-passport/list-passport.component';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { AuthGuard } from './guards/auth.guard'; 
import { LoginGuard } from './guards/login.guard'; 
import { RoleGuardService } from './guards/role-guard.service';
import { ErrorComponent } from './error/error.component';
import { MyDetailsComponent } from './my-details/my-details.component';
import { MyPassportComponent } from './my-passport/my-passport.component';
import { DemandeVisaComponent } from './demande-visa/demande-visa.component';
import { DemandeMissionComponent } from './demande-mission/demande-mission.component';
import { DashbordComponent } from './dashbord/dashbord.component';
const routes: Routes = [
  { path: '', component: LoginComponent , },
  { path: 'app', component: AppLayoutComponent,  canActivate: [AuthGuard],children: [
      { path: 'table', component: TableComponent ,canActivate: [RoleGuardService],
      data: { roles: ['ADMIN'] }},
      
      { path: 'list-visa', component: ListVisaComponent },
      { path: 'list-passport', component: ListPassportComponent },
      { path: 'list-roles', component: ListRolesComponent },
      { path: 'my-details', component: MyDetailsComponent },
      { path: 'my-passport', component: MyPassportComponent },
      { path: 'request', component: DemandeVisaComponent },
      { path: 'mission', component: DemandeMissionComponent },
      { path: 'Dashbord', component: DashbordComponent },
    ]
  },
  { path: 'acces', component: AccessComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'login', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: 'error' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
