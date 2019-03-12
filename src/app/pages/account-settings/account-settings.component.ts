import { SettingsService } from '../../services/service.index';
import { Component, OnInit} from "@angular/core";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor( public _ajustes:SettingsService) {}

  ngOnInit() {
    this.colocarCheck();
  }

  cambiaColor(tema: string, link: any) {
    console.log(tema);
    this.aplicarCheck(link);
    this._ajustes.aplicarTema(tema);
  }

  aplicarCheck(link: any) {
    let selectores: any = document.getElementsByClassName("selector");
    // removemos la palomita de todos los colores
    for (let ref of selectores) {
      ref.classList.remove("working");
    }
    // Le ponemos la palomita al color actual
    link.classList.add('working');
  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName("selector");
    // removemos la palomita de todos los colores
    let tema = this._ajustes.ajustes.tema;
    for (let ref of selectores) {
      if( ref.getAttribute('data-theme') === tema ){        
        // Le ponemos la palomita al color actual
        ref.classList.add('working');
        break;
      }
    }
  }
}
