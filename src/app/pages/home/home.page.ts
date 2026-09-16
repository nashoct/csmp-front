import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPopover,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { PersonInfo } from '../../interfaces/personInfo';
import { PersonService } from '../../services/person.service';
import { ThemeService } from '../../services/theme.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonPopover,
    IonSplitPane,
    IonTitle,
    IonToolbar,
  ],
})
export class HomePage implements OnInit {
  person?: PersonInfo;

  constructor(
    private personService: PersonService,
    private theme: ThemeService,
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.personService.getInfo().subscribe({
      next: (person) => (this.person = person),
    });
  }

  get isDark(): boolean {
    return this.theme.isDark;
  }

  toggleTheme(): void {
    this.theme.toggle();
  }

  async logout(): Promise<void> {
    await this.loginService.logout();
    this.router.navigateByUrl('/login');
  }

  get fullName(): string {
    if (!this.person) {
      return '';
    }
    return [this.person.name, this.person.firstSurname, this.person.secondSurname]
      .filter((part) => !!part)
      .join(' ');
  }

  get email(): string {
    return this.person?.email ?? '';
  }
}
