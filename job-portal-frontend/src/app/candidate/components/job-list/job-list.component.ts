import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Job } from 'src/app/shared/models/job.model';
import { ApplyJobComponent } from '../apply-job/apply-job.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  @Input() jobs: Job[] = [];
  @Input() appliedJob = false;
  @Output() jobClickEvent = new EventEmitter<Job>();

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  applyJob(job: Job): void {
    const dialogRef = this.dialog.open(ApplyJobComponent, {
      data: job,
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { id: number; experience: number }) => {
        if (result) {
          this.dataService
            .applyJob(result.id, result.experience)
            .subscribe(() => {});
        }
      });
  }

  saveJob(job: Job): void {}

  onClick(job: Job): void {
    if (this.appliedJob) {
      this.jobClickEvent.emit(job);
    }
  }
}
