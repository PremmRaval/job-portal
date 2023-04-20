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
    this.router.navigate([path]);
  }
}
