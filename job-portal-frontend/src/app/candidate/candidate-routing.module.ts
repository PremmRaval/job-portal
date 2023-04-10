import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs.component';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NoAuthGuard } from '../shared/guards/no-auth.guard';
import { AuthGuard } from '../shared/guards/auth.guard';

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
    path: 'applied-jobs',
    component: AppliedJobsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'saved-jobs',
    component: SavedJobsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule {}
