import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/shared/models/job.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.css'],
})
export class SavedJobsComponent implements OnInit {
  $savedJobs = new Observable<Job[]>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.$savedJobs = this.dataService.getsavedJobs();
  }
}
