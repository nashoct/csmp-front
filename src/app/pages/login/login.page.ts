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
    console.log('User:', this.user);
    this.loginService.login("nashoct@hotmail.com", "1234");
    // Aquí iría la lógica de autenticación
  }
}
