import { banner } from '../../helpers/functions.js';
import { optionMenuSelect } from '../../helpers/enquirer.js';
import { purgarSqs } from './options/purgarSqs.js';
import { showMenuMajor } from '../../index.js';

/**
 *
 * @param {*} opt  Recibe como parametros las opciones.
 */
const selectOptSqs = (opt) => {
    switch (opt.toLowerCase()) {
        case "atras":
            showMenuMajor()
            break;
        case "purgar sqs":
            purgarSqs();
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
const sqsMenu = async () => {
    const menuList = ["Atras","Purgar SQS", "Salir"];
    console.clear();
    banner("Seleccione una Opción");
    const optionSelect = await optionMenuSelect(menuList)
    selectOptSqs(optionSelect)
}

export {
    sqsMenu
}