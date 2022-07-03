import { banner } from "./helpers/functions.js";
import { optionMenuSelect } from './helpers/enquirer.js';
import { s3Menu } from './service/s3/s3.js';
import { dynamoDBMenu } from "./service/dynamodb/dynamodbMenu.js";
import { sqsMenu } from './service/sqs/sqs.js';

/**
 * Método que recibe la opcion seleccionada y muestra opciones de ese servicio.
 * @param {*} opt
 */
const selectServices = (opt) => {
    switch (opt.toLowerCase()) {
        case "s3":
            s3Menu();
            break;
        case "api gateway":
            console.log("Api Gateway");
            break;
        case "dynamodb":
            dynamoDBMenu();
            break;
        case "sqs":
            sqsMenu();
            break;
        case "salir":
            console.log("Salir");
            break;
        default:
            break;
    }
};

/**
 * Metodo que nos permite mostrar el menú principal
 *
 */
const showMenuMajor = async () => {
    console.clear();
    banner("Seleccione un Servicio");
    const menuList = ['S3', 'Api Gateway', 'DynamoDB', 'SQS', 'Salir'];
    const optionSelect = await optionMenuSelect(menuList)
    await selectServices(optionSelect);
};

export {
    showMenuMajor
}