import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NoAuthGuard } from '../shared/guards/no-auth.guard';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { JobPostingFormComponent } from './components/job-posting-form/job-posting-form.component';
import { JobApplicationsComponent } from './components/job-applications/job-applications.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'job-posting',
    component: JobPostingFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'job-applications',
    component: JobApplicationsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
