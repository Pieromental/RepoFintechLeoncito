import { DatosPrincipalesRepository } from "../domain/configuracion_principal/DatosPrincipalesRepository";

export class DatosPrincipalesInMemoryRepository extends DatosPrincipalesRepository {

    async cargarDatosPrincipales(id) {
        try {
            //let { data } = await this.requestApi(`ver_datos_principales?id=${id}`);
            let data = "cargarDatosPrincipales llega =>", id;
            return data;
        } catch (error) {
          throw new Error(error);
        }
    };
    
    async guardarDatosPrincipales(DatosPrincipales) {
        try {
            let put = {};
            put.direccion = DatosPrincipales.direccion;
            put.telefono = DatosPrincipales.telefono;
            put.correoElectronico = DatosPrincipales.correoElectronico;
            //let { data } = await this.requestApi("actualizar_datos_principales", put, "PUT");
            let data = "guardarDatosPrincipales llega =>", DatosPrincipales;
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
    
}