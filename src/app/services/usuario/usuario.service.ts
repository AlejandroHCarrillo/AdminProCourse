import { URL_SERVICIOS } from "../../config/config";
import { Injectable } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import * as swal from "sweetalert";
import { Token } from "@angular/compiler";
import { Router } from "@angular/router";

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient,
              public router: Router
    ) {
    this.cargarStorage()
  }

  estaLogueado():boolean {
    return (this.token && this.token.length > 5);
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem("id");
      this.usuario = JSON.parse( localStorage.getItem("usuario"));
    } else{
      this.token = "";
      this.usuario = null;
    }

  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
    
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "/login/google";
    return this.http.post(url, { token }).map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    });
  }

  login(usuario: Usuario, recordar: boolean) {
    if (recordar) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }

    let url = URL_SERVICIOS + "/login";

    return this.http.post(url, usuario).map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    });
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuario";
    return this.http.post(url, usuario).map((resp: any) => {
      // swal('Usuario creado ',  usuario.email, 'success' );
      alert("Usuario creado " + usuario.email);
      return resp.Usuario;
    });
  }
}
