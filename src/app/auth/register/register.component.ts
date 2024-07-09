import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',

})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router ){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ]
    })
  }

  crearUsuario(){

    if( this.registerForm.invalid ){ return; }

    let timerInterval;
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading();
      }
    });


    const { name, email, password } = this.registerForm.value;

    this.authService.crearUsuario( name, email, password)
    .then( credenciales => {
      console.log(credenciales)
      Swal.close();
      this.router.navigate(['/']);
    })
    .catch( err=> {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    })
  }

}
