import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from 'src/app/shared/models/job.model';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  signIn(user: { email?: string | null; password?: string | null }) {
    return this.http.post<{ token: string }>(
      'http://localhost:3000/api/candidate/sign-in',
      user
    );
  }

  uploadCertificate(data: FormData) {
    return this.http.post<{ fileName: string; message: string }>(
      'http://localhost:3000/api/candidate/upload-certificate',
      data
    );
  }

  signUp(user: any) {
    return this.http.post<any>(
      'http://localhost:3000/api/candidate/sign-up',
      user
    );
  }

  getRecommendedJobs() {
    return this.http.get<Job[]>('http://localhost:3000/api/candidate/jobs');
  }

  getAppliedJobs() {
    return this.http.get<Job[]>(
      'http://localhost:3000/api/candidate/applied-jobs'
    );
  }

  getsavedJobs() {
    return this.http.get<Job[]>('https://jsonplaceholder.typicode.com/posts');
  }

  applyJob(id: number, experience: number) {
    return this.http.post(`http://localhost:3000/api/candidate/apply-job`, {
      jobID: id,
      experience: experience,
    });
  }

  getProfile() {
    return this.http.get(`http://localhost:3000/api/candidate/profile`);
  }

  uploadResume(file: FormData) {
    return this.http.post<{ fileName: string; message: string }>(
      'http://localhost:3000/api/candidate/upload-resume',
      file
    );
  }

  deleteResume() {
    return this.http.post<void>(
      'http://localhost:3000/api/candidate/delete-resume',
      {}
    );
  }

  updateProfile(user: any) {
    return this.http.post<void>(
      `http://localhost:3000/api/candidate/update-profile`,
      user
    );
  }
}
