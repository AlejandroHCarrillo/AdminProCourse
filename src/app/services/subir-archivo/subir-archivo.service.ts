import { URL_SERVICIOS } from "./../../config/config";
import { Injectable } from "@angular/core";

@Injectable()
export class SubirArchivoService {
  constructor() {}

  subirArchivo(archivo: File, tipo: string, id: string) {

    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append("imagen", archivo, archivo.name);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("Imagen Subida");
            resolve(xhr.response);
          } else {
            console.log("Fallo la carga del archivo");
            reject(xhr.response);
          }
        }
      };
      let url = URL_SERVICIOS + "/uploads/" + tipo + "/" + id;

      xhr.open("PUT", url, true);
      xhr.send(formData);

    });
  }
}
