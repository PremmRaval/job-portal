import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-posting-form',
  templateUrl: './job-posting-form.component.html',
  styleUrls: ['./job-posting-form.component.css'],
})
export class JobPostingFormComponent implements OnInit {
  jobPostingForm = this.fb.group({
    title: ['', Validators.required],
    company: ['', Validators.required],
    description: ['', Validators.required],
    location: ['', Validators.required],
    type: ['', Validators.required],
    salary: ['', Validators.required],
    contactName: ['', Validators.required],
    contactEmail: ['', [Validators.required, Validators.email]],
    contactPhone: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.dataService.postJob(this.jobPostingForm.value).subscribe(() => {
      this.snackBar.open('Job posted Successfully', 'close', {
        duration: 3000,
      });
      this.jobPostingForm.reset();
    });
  }
}
