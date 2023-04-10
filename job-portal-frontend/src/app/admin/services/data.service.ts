import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidate } from 'src/app/shared/models/candidate.model';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  signIn(user: { email?: string | null; password?: string | null }) {
    return this.http.post<{ token: string }>(
      'http://localhost:3000/api/admin/sign-in',
      user
    );
  }

  getUsersInProcess() {
    return this.http.get<{ users: Candidate[] }>(
      'http://localhost:3000/api/admin/users-in-process-state'
    );
  }

  setAccountStatus(userID: number, status: number) {
    return this.http.post<{ message: string }>(
      `http://localhost:3000/api/admin/update-user-state`,
      {
        id: userID,
        status: status,
      }
    );
  }
}
