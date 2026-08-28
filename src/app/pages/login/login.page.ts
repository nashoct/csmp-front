import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service'
import { Login } from '../../models/login.model'

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
    imports: [IonContent, CommonModule, FormsModule, RouterLink]
})
export class LoginPage implements OnInit {
  user: Login = new Login('', '');
  showPassword = false;

  constructor(private router: Router, public loginService: LoginService) {}

  ngOnInit () {
  }

  onLogin() {
    this.loginService.login(this.user.email, this.user.password).subscribe({
      next: (ok) => {
        if (ok) {
          this.router.navigateByUrl('/home');
        }
      },
      error: () => {},
    });
  }
}
