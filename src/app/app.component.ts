import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  arrowBack,
  lockClosed,
  logoIonic,
  logOutOutline,
  mail,
  personOutline,
  chevronForwardOutline,
  statsChartOutline,
  personCircle,
  settingsOutline,
} from 'ionicons/icons';
import { person } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      logoIonic,
      person,
      arrowBack,
      chevronForwardOutline,
      logOutOutline,
      statsChartOutline,
      personOutline,
      personCircle,
      settingsOutline,
    });
  }
}
