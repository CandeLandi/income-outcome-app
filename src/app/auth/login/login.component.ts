import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loading: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui =>
      this.loading = ui.isLoading
    );
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());
    //
    /*     let timerInterval;
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading();
      }
    }); */

    const { email, password } = this.loginForm.value;

    this.authService
      .loginUsuario(email, password)
      .then((credenciales) => {
        console.log(credenciales);
        /* Swal.close(); */
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }
}
