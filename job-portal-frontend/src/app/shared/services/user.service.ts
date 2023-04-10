import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  accountType$ = new BehaviorSubject<number>(-1);
  constructor(private http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.http
        .get<{ account_type: number }>('http://localhost:3000/api/user')
        .subscribe((result) => {
          this.accountType$.next(result.account_type);
        });
    }
  }

  get accountType(): number {
    return this.accountType$.getValue();
  }

  setAccountType(accountType: number): void {
    this.accountType$.next(accountType);
  }
}
