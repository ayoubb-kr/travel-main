import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component'; 
import { TableComponent } from './table/table.component';
import { LoginComponent } from './login/login.component';
import { AccessComponent } from './access/access.component';
import { ListVisaComponent } from './list-visa/list-visa.component';
import { ListPassportComponent } from './list-passport/list-passport.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'app', component: AppLayoutComponent, children: [
      { path: 'table', component: TableComponent },
      { path: 'acces', component: AccessComponent },
      { path: 'list-visa', component: ListVisaComponent },
      { path: 'list-passport', component: ListPassportComponent },
    ]
  },
  { path: 'login', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
