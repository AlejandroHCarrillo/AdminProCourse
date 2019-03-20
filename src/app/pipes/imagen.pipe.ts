import { URL_SERVICIOS } from "./../config/config";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "imagen"
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = "usuario"): any {
    // Es una imagen de Google
    if (img.indexOf("https") >= 0) {
      return img;
    }

    let url = URL_SERVICIOS + "/img";
    // Imagen por default (Imagen no encontrada)
    if (!img) {
      return url + "/usuarios/x";
    }

    switch (tipo) {
      case "usuario":
        url += "/usuarios/" + img;
        break;
      case "medico":
        url += "/medicos/" + img;
        break;
      case "hospital":
        url += "/hospitales/" + img;
        break;
      default:
        console.log("Tipo de archivo no permitido.");
        url += "/usuarios/x"
        break;
    }
    return url;
  }
}
