import { Router } from '@angular/router';
import { UsuarioService } from "../services/service.index";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as swal from "sweetalert";
import { Usuario } from "../models/usuario.model";

declare function init_plugins();

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./login.component.css"]
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;

  constructor(public _usuarioService: UsuarioService, public router: Router) {}

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      return pass1 === pass2 ? null : { sonIguales: true };
      // if (pass1===pass2){
      //   return null;
      // }
      // return { sonIguales: true };
    };
  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false)
      },
      { validators: this.sonIguales("password", "password2") }
    );

    // Dummy data
    this.forma.setValue({
      nombre: "Loco",
      correo: "loco@superrito.com",
      password: "123456",
      password2: "123456",
      condiciones: true
    });
  }

  registraUsuario() {
    console.log("el formulario es valido? ", this.forma.valid);
    if (this.forma.invalid) {
      return;
    }

    // console.log(this.forma);

    if (!this.forma.value.condiciones) {
      console.log("Debe aceptar las condiciones");
      // swal('Importante', 'Debe aceptar las condiciones', 'warning');
      alert("Debe aceptar las condiciones");
      return;
    }

    // Bajar info de la forma a un objeto
    let usuario = new Usuario(
      this.forma.value.nombre,
      "X",
      "Y",
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp => this.router.navigate(['/login']));
  }
}
