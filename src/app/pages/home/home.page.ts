import { Component, OnInit } from '@angular/core';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonMenuButton,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { PersonInfo } from '../../interfaces/personInfo';
import { PersonService } from '../../services/person.service';

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
    IonSplitPane,
    IonTitle,
    IonToolbar,
  ],
})
export class HomePage implements OnInit {
  person?: PersonInfo;

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.personService.getInfo().subscribe({
      next: (person) => (this.person = person),
    });
  }

  get fullName(): string {
    if (!this.person) {
      return '';
    }
    return [this.person.name, this.person.firstSurname, this.person.secondSurname]
      .filter((part) => !!part)
      .join(' ');
  }
}
