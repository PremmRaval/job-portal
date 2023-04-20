import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Application } from 'src/app/shared/models/application.model';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css'],
})
export class JobApplicationsComponent implements OnInit {
  $applications = new Observable<Application[]>();
  selectedApplication: Application | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.$applications = this.dataService.getAllApplications();
  }

  viewDetails(application: Application) {
    this.selectedApplication = application;
  }

  acceptCandidate(application: Application) {
    this.dataService.updateApplication(application, 1).subscribe(() => {
      this.selectedApplication = null;
      this.$applications = this.dataService.getAllApplications();
    });
  }

  rejectCandidate(application: Application) {
    this.dataService.updateApplication(application, 2).subscribe(() => {
      this.selectedApplication = null;
      this.$applications = this.dataService.getAllApplications();
    });
  }
}
