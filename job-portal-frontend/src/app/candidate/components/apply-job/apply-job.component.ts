import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Job } from 'src/app/shared/models/job.model';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css'],
})
export class ApplyJobComponent implements OnInit {
  applyJobForm = this.formBuilder.group({
    experience: [0, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ApplyJobComponent>,
    @Inject(MAT_DIALOG_DATA) public job: Job
  ) {}

  ngOnInit(): void {}

  applyJob(): void {
    this.dialogRef.close({
      id: this.job.id,
      experience: this.applyJobForm.value.experience,
    });
  }
}
