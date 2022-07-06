import { confirm, optionMenuSelect } from "../../../helpers/enquirer.js";
import ora from 'ora';
import { dynamoDBMenu } from '../dynamodbMenu.js';
import { createDir, execCommand, existDir, writeFile } from '../../../helpers/functions.js';
import { showMenuMajor } from "../../../index.js";

/**
 * Método que obtiene todos los datos de la tabla seleccionada, también se encarga de generar un directorio /dynamodb/fileTable donde almacena estos datos.
 * @param {*} tableName   Nombre de la tabla seleccionada
 *
 */
const generateFileDataTable = async (tableName) => {
    const dirName = 'src/service/dynamodb';
    const pathTable = `${dirName}/fileTable`;
    const commandExec = `aws dynamodb scan --table-name ${tableName} --region us-east-1`;
    const { stdout } = await execCommand(commandExec);
    if (!existDir(pathTable)) {
        createDir(pathTable);
    }
    const data = JSON.parse(stdout);
    await writeFile(`${pathTable}/${tableName}.json`, JSON.stringify(data))

    console.log(`Datos generados en: ${pathTable}`.bgGreen)

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
    const commandExec = 'aws dynamodb list-tables --region us-east-1';
    const { stdout } = await execCommand(commandExec);
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

    const tableSelect = await optionMenuSelect(tableList, `Hola Seleccione la Tabla a usar`, {back:true});

    if (tableSelect == "Atras") {
        showMenuMajor()
    } else {
        console.log(`Tabla seleccionada: ${tableSelect.green}`)
        const iscorrect = await confirm('La tabla seleccionada es correcta?');
        if (iscorrect) {
            generateFileDataTable(tableSelect)
        } else {
            dynamoDBMenu()
        }
    }



}

export {
    getTableData
}



