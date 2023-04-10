import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/shared/models/job.model';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  $recommendedJobs = new Observable<Job[]>();

  constructor(private dataService: DataService, ) {}

  ngOnInit(): void {
    this.$recommendedJobs = this.dataService.getRecommendedJobs();
  }
}
