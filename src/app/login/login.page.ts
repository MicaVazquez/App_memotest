import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonIcon,
  IonFabButton,
  IonFabList,
  IonFab,
  IonButton,
  IonToast,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonToast,
    IonButton,
    IonIcon,
    IonInput,
    IonContent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  ngOnInit() {}
  form!: FormGroup;

  constructor(
    private router: Router,
    public toastCtrl: ToastController,
    private auth: AuthService
  ) {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
  async onSubmit() {
    if (this.form.valid) {
      try {
        await this.auth.login(this.form.value.email, this.form.value.password);
        console.log(this.form.value.email);
        this.presentToast('Inicio exitoso!', 'success');
        this.router.navigate(['/home']);
      } catch (error) {
        this.presentToast('Error. Verifique las credenciales...', 'danger');
      }
      return;
    }
  }

  login_Anonimo() {
    this.form.controls['email'].setValue('anonimo@anonimo.com');
    this.form.controls['password'].setValue('passwordAnonimo');
  }

  login_Invitado() {
    this.form.controls['email'].setValue('invitado@invitado.com');
    this.form.controls['password'].setValue('passwordInvitado');
  }

  login_Usuario() {
    this.form.controls['email'].setValue('usuario@usuario.com');
    this.form.controls['password'].setValue('passwordUsuario');
  }

  login_Admin() {
    this.form.controls['email'].setValue('admin@admin.com');
    this.form.controls['password'].setValue('passwordAdmin');
  }

  login_Tester() {
    this.form.controls['email'].setValue('tester@tester.com');
    this.form.controls['password'].setValue('passwordTester');
  }
}
