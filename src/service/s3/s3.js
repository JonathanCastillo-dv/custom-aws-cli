import { banner } from '../../helpers/functions.js';
import {optionMenuSelect } from '../../helpers/enquirer.js'
import { deleteBucket } from './options/deleteBucket.js';

/**
 *
 * @param {*} opt  Recibe como parametros las opciones.
 */
const selectOptS3 = (opt) => {
    switch (opt.toLowerCase()) {
        case "delete buckets":
            deleteBucket()
            break;
        case "salir":
            console.log("Salir");
            break;
        default:
            break;
    }
};

/**
 *Metodo que muestra las opciones del servicio S3
 */
const s3Menu = async () => {
    const menuList = ["Delete Buckets", "Salir"];
    console.clear();
    banner("Seleccione una Opción");
    const optionSelect = await optionMenuSelect(menuList)
    selectOptS3(optionSelect)
}

export {
    s3Menu
}
