// import { UsuarioService } from './../service.index';
import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor( public _usuarioService : UsuarioService, 
               public router: Router ){

  }

  canActivate(): boolean {
    console.log('Revision de rutina del login guard');
    if (this._usuarioService.estaLogueado()){
      console.log('Guard: Sigue adelante');
      
      return true;
    }
    else 
    {
      console.log('Guard: Alto ahi!!!');
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
