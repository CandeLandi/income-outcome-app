import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',

})
export class RegisterComponent implements OnInit {

  myForm!: FormGroup;

  constructor( private fb: FormBuilder ){}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', Validators.required, Validators.email ],
      password: ['', Validators.required ]
    })
  }

  crearUsuario(){

  }

}
