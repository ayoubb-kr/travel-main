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
import { MyVisaComponent } from './my-visa/my-visa.component';
const routes: Routes = [
  { path: '', component: LoginComponent , canActivate: [LoginGuard]},
  { path: 'app', component: AppLayoutComponent,  canActivate: [AuthGuard],children: [

      { path: 'Dashbord', component: DashbordComponent ,canActivate: [RoleGuardService], data: { roles: ['ADMIN','TRAVEL_MANAGER','AGENT_RH','TEAM_LEADER'] }},
      { path: 'table', component: TableComponent ,canActivate: [RoleGuardService], data: { roles: ['ADMIN'] }},
      { path: 'list-visa', component: ListVisaComponent ,canActivate: [RoleGuardService], data: { roles: ['ADMIN'] }},
      { path: 'list-passport', component: ListPassportComponent ,canActivate: [RoleGuardService], data: { roles: ['ADMIN'] }},
      { path: 'list-roles', component: ListRolesComponent ,canActivate: [RoleGuardService], data: { roles: ['ADMIN'] } },

      { path: 'request', component: DemandeVisaComponent ,canActivate: [RoleGuardService], data: { roles: ['ADMIN','TRAVEL_MANAGER','AGENT_RH'] }},
      { path: 'mission', component: DemandeMissionComponent ,canActivate: [RoleGuardService], data: { roles: ['ADMIN','TRAVEL_MANAGER','TEAM_LEADER'] }},
      
    
      { path: 'my-visa', component: MyVisaComponent ,canActivate: [RoleGuardService], data: { roles: ['ADMIN','USER', 'TRAVEL_MANAGER','AGENT_RH','TEAM_LEADER'] } },
      { path: 'my-details', component: MyDetailsComponent ,canActivate: [RoleGuardService], data: { roles: ['ADMIN','USER', 'TRAVEL_MANAGER','AGENT_RH','TEAM_LEADER'] }},
      { path: 'my-passport', component: MyPassportComponent ,canActivate: [RoleGuardService], data: { roles: ['ADMIN','USER', 'TRAVEL_MANAGER','AGENT_RH','TEAM_LEADER'] }},
    ]
  },
  { path: 'acces', component: AccessComponent },
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: 'error' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
