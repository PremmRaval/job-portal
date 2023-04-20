import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  get accountType(): Observable<{ account_type: number }> {
    return this.http.get<{ account_type: number }>(
      'http://localhost:3000/api/user'
    );
  }
}
