import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private userService: UserService) {
    if (localStorage.getItem('token')) {
      this.isLoggedIn$.next(true);
    }
  }

  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  signIn(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedIn$.next(true);
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.isLoggedIn$.next(false);
    let path = '/sign-in';
    if (this.userService.accountType === 1) {
      path = 'company/sign-in';
    } else if (this.userService.accountType === 2) {
      path = 'admin/sign-in';
    }
    this.userService.setAccountType(-1);
    this.router.navigate([path]);
  }
}
