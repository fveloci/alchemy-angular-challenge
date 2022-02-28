import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  logged: boolean = false;
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    const token = this.authService.getTokenFromStorage();
    if(token !== null) this.logged = true;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }

}
