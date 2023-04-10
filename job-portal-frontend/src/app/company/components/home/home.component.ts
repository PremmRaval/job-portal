import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/shared/models/job.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  $recentJobs: Observable<Job[]> = new Observable<Job[]>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.$recentJobs = this.dataService.getAllPostedJobs();
  }
}
