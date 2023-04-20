import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  accountType: number = -1;
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.accountType.subscribe((result) => {
      this.accountType = result.account_type;
    });
  }

  navigateTo(path: string): void {
    if (path === 'home' && this.accountType === 1) {
      path = 'company/home';
    } else if (path === 'home' && this.accountType === 2) {
      path = 'admin/home';
    }
    this.router.navigate([path]);
  }

  logout(): void {
    this.authService.signOut();
  }
}
