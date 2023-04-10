import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = this.fb.group({
    first_name: [''],
    last_name: [''],
    email: [''],
    phone: [''],
    age: [''],
    resume_path: [''],
  });
  originalValues: any;
  isFormDirty = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dataService.getProfile().subscribe((data: any) => {
      this.originalValues = data;
      this.profileForm.patchValue(data);
    });

    this.profileForm.valueChanges.subscribe(() => {
      const formValue = JSON.stringify(this.profileForm.value);
      const originalValue = JSON.stringify(this.originalValues);
      this.isFormDirty = formValue !== originalValue;
    });
  }

  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.dataService.uploadResume(formData).subscribe((data: any) => {
        this.snackBar.open(data.message, 'close', {
          duration: 3000,
        });
        this.profileForm.patchValue({ resume_path: data.fileName });
      });
    }
  }

  onUpload(): void {
    // trigger the file input field
    document.getElementById('fileInput')?.click();
  }

  onDeleteResume() {
    if (confirm('Are you sure you want to delete your resume?')) {
      this.dataService.deleteResume().subscribe(() => {
        this.profileForm.patchValue({ resume_path: '' });
      });
    }
  }

  onSubmit() {
    if (this.profileForm.valid && this.profileForm.value) {
      this.dataService.updateProfile(this.profileForm.value).subscribe(() => {
        this.originalValues = this.profileForm.value;
        this.isFormDirty = false;
        this.snackBar.open('Profile updated successfully!', 'Close', {
          duration: 3000,
        });
      });
    }
  }
}
