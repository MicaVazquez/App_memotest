import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonIcon,
  IonText,
  IonAvatar,
  IonChip,
  IonCardContent,
  IonLabel,
} from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonText, IonTitle],
})
export class SplashPage implements OnInit {
  router_service = inject(Router);
  constructor(private platform: Platform) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      SplashScreen.hide().then(() => {
        setTimeout(() => {
          this.router_service.navigate(['login']);
        }, 3000);
      });
    });
  }
}
