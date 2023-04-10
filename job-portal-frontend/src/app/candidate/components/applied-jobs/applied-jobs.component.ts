import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Job } from 'src/app/shared/models/job.model';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css'],
})
export class AppliedJobsComponent implements OnInit {
  $appliedJobs = new Observable<Job[]>();
  selectedJob: Job | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.$appliedJobs = this.dataService.getAppliedJobs();
  }

  setSelectedJob(job: Job) {
    this.selectedJob = job;
  }
}
