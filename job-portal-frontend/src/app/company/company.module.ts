import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DataService } from './services/data.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JobPostingFormComponent } from './components/job-posting-form/job-posting-form.component';
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from '../shared/interceptors/auth.interceptor';
import { ErrorHandlerInterceptor } from '../shared/interceptors/error-handler.interceptor';
import { JobApplicationsComponent } from './components/job-applications/job-applications.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    JobPostingFormComponent,
    HomeComponent,
    JobApplicationsComponent,
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
})
export class CompanyModule {}
