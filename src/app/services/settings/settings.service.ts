import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

@Injectable()
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: "assets/css/colors/default.css",
    tema: "default"
  };

  constructor(@Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    // console.log("Guardando ajustes en el local storage");
    localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem("ajustes")) {
      // console.log("Cargando ajustes en el local storage");
      this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
      this.aplicarTema(this.ajustes.tema);
    }
    else{
      // console.log('Ajustes default');
      this.aplicarTema(this.ajustes.tema);      
    }
  }

  aplicarTema(tema:string){
    let url = `/assets/css/colors/${tema}.css`;
    this._document.getElementById("tema").setAttribute("href", url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}