import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component'; 
import { TableComponent } from './table/table.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'app', component: AppLayoutComponent, children: [
      { path: 'table', component: TableComponent },

      
    ]
  },
  { path: 'login', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
