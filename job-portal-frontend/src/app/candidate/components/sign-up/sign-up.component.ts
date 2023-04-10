import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    phone: ['', Validators.required],
    age: ['', Validators.required],
    certificate_path: ['', Validators.required],
  });
  certificateUploaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  openInput() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  uploadCertificate(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);

      this.dataService.uploadCertificate(formData).subscribe((result) => {
        this.signUpForm.patchValue({ certificate_path: result.fileName });
        this.certificateUploaded = true;
      });
    }
  }

  signUp() {
    this.dataService.signUp(this.signUpForm.value).subscribe(() => {
      this.snackBar.open(
        'You have successfully created your account. You will be able to log in once your account has been approved.',
        'close',
        {
          duration: 3000,
        }
      );
      this.signUpForm.reset();
      this.certificateUploaded = false;
    });
  }

  signIn() {
    this.router.navigate(['sign-in']);
  }

  companySignUp(): void {
    this.router.navigate(['company/sign-up']);
  }
}
