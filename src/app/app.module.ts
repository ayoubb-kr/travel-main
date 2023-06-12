


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { TableComponent } from './table/table.component'; 
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { TagModule } from 'primeng/tag';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LoginModule } from './login/login.module';
import { UserService } from './service/user.service';
import { VisaService } from './service/visa.service';
import { AccessModule } from './access/access.module';
import { ListVisaComponent } from './list-visa/list-visa.component';
import { ListPassportComponent } from './list-passport/list-passport.component';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { ErrorModule } from './error/error.module';
import { MyDetailsComponent } from './my-details/my-details.component';
import { MyPassportComponent } from './my-passport/my-passport.component';
import { DemandeVisaComponent } from './demande-visa/demande-visa.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { MyVisaComponent } from './my-visa/my-visa.component';
import { StepsModule } from 'primeng/steps';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestMissionComponent } from './request-mission/request-mission.component';
import { RequestMissionModule } from './request-mission/request-mission.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TableMissionComponent } from './table-mission/table-mission.component';
import { MyMissionsComponent } from './my-missions/my-missions.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ListVisaComponent,
    ListPassportComponent,
    ListRolesComponent,
    MyDetailsComponent,
    MyPassportComponent,
    DemandeVisaComponent,
    DashbordComponent,
    MyVisaComponent,
    RequestMissionComponent,
    RequestMissionComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    TableMissionComponent,
    MyMissionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    BrowserAnimationsModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    TagModule,
    LoginModule,
    BrowserAnimationsModule,
    AccessModule,
    ErrorModule,
    StepsModule,
    ReactiveFormsModule,
    RequestMissionModule,
    CardModule,
   CurrencyMaskModule,
  ],
  providers: [ MessageService, ConfirmationService,UserService,VisaService],
  bootstrap: [AppComponent]

})
export class AppModule { }
