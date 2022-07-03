import { optionMenuSelect } from "../../helpers/enquirer.js";
import { banner } from "../../helpers/functions.js";
import { getTableData } from "./options/getTableData.js";

/**
 *
 * @param {*} opt  Recibe como parametros las opciones.
 */
const selectOptDynamodb = (opt) => {
    switch (opt.toLowerCase()) {
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
    const optionSelect = await optionMenuSelect(menuList)
    selectOptDynamodb(optionSelect)
}

export {
    dynamoDBMenu
}

