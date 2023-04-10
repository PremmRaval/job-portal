import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { DataService } from './services/data.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JobListComponent } from './components/job-list/job-list.component';
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs.component';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthInterceptor } from '../shared/interceptors/auth.interceptor';
import { ApplyJobComponent } from './components/apply-job/apply-job.component';
import { ErrorHandlerInterceptor } from '../shared/interceptors/error-handler.interceptor';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    JobListComponent,
    AppliedJobsComponent,
    SavedJobsComponent,
    ProfileComponent,
    ApplyJobComponent,
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
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
export class CandidateModule {}
