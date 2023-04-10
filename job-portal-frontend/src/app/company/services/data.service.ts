import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from 'src/app/shared/models/job.model';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  signIn(user: { email?: string | null; password?: string | null }) {
    return this.http.post<{ token: string }>(
      'http://localhost:3000/api/company/sign-in',
      user
    );
  }

  signUp(user: {
    name?: string | null;
    email?: string | null;
    password?: string | null;
    image?: string | null;
  }) {
    return this.http.post<void>(
      'http://localhost:3000/api/company/sign-up',
      user
    );
  }

  uploadLogo(data: FormData) {
    return this.http.post<{ fileName: string; message: string }>(
      'http://localhost:3000/api/company/upload-logo',
      data
    );
  }

  postJob(data: any) {
    return this.http.post<{ message: string }>(
      'http://localhost:3000/api/company/post-job',
      data
    );
  }

  getAllPostedJobs() {
    return this.http.get<Job[]>('http://localhost:3000/api/company/get-jobs');
  }
}
