import { Component } from '@angular/core';
import {
  IonContent,
  IonIcon,
  IonButton,
  IonSpinner,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { DatabaseService } from '../services/database.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonButton, IonIcon, IonContent, NgIf],
})
export class HomePage {
  private statsSubscription: Subscription | undefined;
  public isLoadingStast: boolean = false;
  email: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private db: DatabaseService
  ) {
    this.auth.getEmail().then((email) => {
      if (!email) {
        this.auth.logout();
      } else {
        this.email = email;
        console.log('Email del usuario:', this.email);
      }
    });
  }

  logOut() {
    this.auth.logout();
  }

  selectLevel(level: string) {
    console.log('Nivel seleccionado:', level);
    this.router.navigate(['/mesa', { level }]);
  }

  async btnEstadisticas() {
    const { value: level } = await Swal.fire({
      title: 'Selecciona el nivel',
      input: 'select',
      inputOptions: {
        easy: 'Nivel Fácil',
        medium: 'Nivel Medio',
        hard: 'Nivel Difícil',
      },
      inputPlaceholder: 'Selecciona un nivel',
      showCancelButton: true,
      cancelButtonText: 'Cancelar', // Texto en español para el botón de cancelar
      heightAuto: false,
    });

    if (level) {
      this.isLoadingStast = true; // Mostrar el spinner
      if (this.statsSubscription) {
        this.statsSubscription.unsubscribe();
      }
      this.statsSubscription = this.db.getAllStats().subscribe({
        next: (stats: any) => {
          this.isLoadingStast = false;
          const filteredStats = stats.filter(
            (stat: any) => stat.modo === level
          );
          const sortedStats = filteredStats
            .sort((a: any, b: any) => a.timer - b.timer)
            .slice(0, 5);

          let statsHtml = '<ul>';
          sortedStats.forEach((stat: any) => {
            statsHtml += `<li>${stat.email} - ${this.formatTime(
              stat.timer
            )} - ${new Date(stat.fecha).toLocaleDateString()}</li>`;
          });
          statsHtml += '</ul>';

          let levelTitle = '';
          switch (level) {
            case 'easy':
              levelTitle = 'LOS MEJORES JUGADORES DE LA DIFICULTAD FÁCIL';
              break;
            case 'medium':
              levelTitle = 'LOS MEJORES JUGADORES DE LA DIFICULTAD MEDIA';
              break;
            case 'hard':
              levelTitle = 'LOS MEJORES JUGADORES DE LA DIFICULTAD DIFÍCIL';
              break;
          }

          Swal.fire({
            title: levelTitle,
            html: statsHtml,
            heightAuto: false,
          });

          // Cancela la suscripción después de mostrar el SweetAlert
          if (this.statsSubscription) {
            this.statsSubscription.unsubscribe();
            this.statsSubscription = undefined;
          }
        },
        error: (error) => {
          this.isLoadingStast = false;
          Swal.fire({
            title: 'Error',
            text: 'No se pudieron obtener las estadísticas',
            icon: 'error',
            heightAuto: false,
          });
          if (this.statsSubscription) {
            this.statsSubscription.unsubscribe();
            this.statsSubscription = undefined;
          }
        },
      });
    }
  }

  formatTime(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const ms = milliseconds % 1000;
    return `${seconds}.${ms < 100 ? '0' : ''}${ms < 10 ? '0' : ''}${ms} s`;
  }

  ngOnDestroy() {
    if (this.statsSubscription) {
      this.statsSubscription.unsubscribe();
    }
  }
}
