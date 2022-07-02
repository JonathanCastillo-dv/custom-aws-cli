import util from 'node:util';
import { exec as execNonPromise } from 'child_process';
const exec = util.promisify(execNonPromise);
import { confirm, optionMenuSelect } from "../../utils/enquirer.js";
import { banner } from "../../utils/utils.js";
import ora from 'ora';
import fs from 'fs';
const fsPromises = fs.promises;

/**
 * Método que obtiene todos los datos de la tabla seleccionada, también se encarga de generar un directorio /dynamodb/fileTable donde almacena estos datos.
 * @param {*} tableName   Nombre de la tabla seleccionada
 *
 */
const generateFileDataTable = async (tableName) => {
    const dirName = 'lib/service/dynamodb';
    const { stdout, stderr } = await exec(`aws dynamodb scan --table-name ${tableName} --region us-east-1`);
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    if (!fs.existsSync(`${dirName}/fileTable`)) {
        await fsPromises.mkdir(`${dirName}/fileTable`);
    }
    const data = JSON.parse(stdout);
    await fsPromises.writeFile(`${dirName}/fileTable/${tableName}.json`, JSON.stringify(data))
    console.log(`Datos generados en: ${dirName}/fileTable`.bgGreen)
    const spinner = ora('Cargando...').start();
    spinner.color = 'red'
    setTimeout(() => {
        spinner.stop();
        dynamoDBMenu();
    }, 5000);
}

/**
 * Función que  retorna un array con nombres de tablas de la cuenta de aws
 * @returns array de nombres de tablas
 */
const getTableList = async () => {
    const { stdout, stderr } = await exec('aws dynamodb list-tables --region us-east-1');
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    const tablesData = JSON.parse(stdout).TableNames;
    return tablesData;
}

/**
 * Metodo que Genera una carpeta llamada fileTable donde contiene archivos con informacion de la tabla seleccionada
 */
const getTableData = async () => {
    const spinner = ora('Cargando...').start();
    spinner.color = 'red'
    const tableList = await getTableList();
    if (tableList) {
        spinner.stop();
    }
    const tableSelect = await optionMenuSelect(tableList, `Hola Seleccione la Tabla a usar`);
    console.log(`Tabla seleccionada: ${tableSelect.green}`)
    const iscorrect = await confirm('La tabla seleccionada es correcta?');
    if (iscorrect) {
        console.log("entre")
        generateFileDataTable(tableSelect)
    } else {
        dynamoDBMenu()
    }

}

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

