import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "./../services/service.index";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

declare function init_plugins();
declare const gapi:any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;
  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) {}

  ngOnInit() {
    init_plugins();
    // console.log('googleInit()');
    this.googleInit();

    this.email = localStorage.getItem("email" || "");
    if(this.email && this.email.length > 1){
      this.recuerdame = true;
    }
  }

  googleInit(){
    // console.log('googleInit');    
    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '246495645277-lej43f1u8smboa1lluam2fdgkcbelco7.apps.googleusercontent.com',
        cookiepolicy : 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));
     })
  }

  attachSignin( element ){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
        .subscribe(() => window.location.href = '#/dashboard' );
     });
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    let usuario = new Usuario(
      null,
      null,
      null,
      forma.value.email,
      forma.value.password
    );
    this._usuarioService
      .login(usuario, forma.value.recuerdame)
      .subscribe(() => this.router.navigate(["/dashboard"]));
  }
}
