import { optionMenuSelect } from "../../helpers/enquirer.js";
import { banner } from "../../helpers/functions.js";
import { showMenuMajor } from "../../index.js";
import { getTableData } from "./options/getTableData.js";

/**
 *
 * @param {*} opt  Recibe como parametros las opciones.
 */
const selectOptDynamodb = (opt) => {
    switch (opt.toLowerCase()) {
        case 'atras':
            showMenuMajor();
            break;
        case "obtener datos de tabla":
            getTableData();
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
const dynamoDBMenu = async () => {
    const menuList = ["Obtener datos de tabla", "Salir"];
    console.clear();
    banner("Seleccione una Opción");
    const optionSelect = await optionMenuSelect(menuList,"",{back:true})
    selectOptDynamodb(optionSelect)
}

export {
    dynamoDBMenu
}

