import { confirm, optionMenuSelect } from "../../../helpers/enquirer.js";
import { execCommand } from "../../../helpers/functions.js";
import ora from 'ora';
import { sqsMenu } from "../sqs.js";

/**
 *Metodo encargado de Purgar la sqs
 * @param {*} sqs nombre de la sqs a purgar
 */
const cleanSqs = async (sqs) => {
    const commandExec = `aws sqs purge-queue --queue-url ${sqs}`;
    await execCommand(commandExec);
    setTimeout(() => {
        console.log(`SQS:${sqs.bgGreen} Purgada con exito`)
    }, 1500);
}

/**
 * Función encargada de retornar una lista de sqs
 * @returns {Array} sqsList
 */
const sqsList = async () => {
    const commandExec = 'aws sqs list-queues';
    const { stdout } = await execCommand(commandExec);

    const urlsSqsList = JSON.parse(stdout).QueueUrls;
    const resultSqsList = await Promise.all(urlsSqsList.map(async (sqs) => {
        const commandExecAtrributes = `aws sqs get-queue-attributes --queue-url ${sqs} --attribute-names All`;
        const { stdout } = await execCommand(commandExecAtrributes);
        const attributeSqs = JSON.parse(stdout).Attributes
        return await `${sqs} # mensajes: ${attributeSqs.ApproximateNumberOfMessages}`
    }))
    return resultSqsList;
}

/**
 * Metodo encargado de Pugar las sqs
 */
const purgarSqs = async () => {
    const spinner = ora('Cargando...').start();
    spinner.color = 'red'
    const getSqsList = await sqsList();
    spinner.stop();
    const sqsSelect = await optionMenuSelect(getSqsList, `Hola Seleccione la SQS a Purgar`);
    console.log(`La SQS Seleccionada es: ${sqsSelect.green}`)
    const iscorrect = await confirm('La SQS seleccionada es correcta?');
    if (iscorrect) {
        const urlSqs = sqsSelect.split('#')[0].trim();
        cleanSqs(urlSqs);
        setTimeout(() => {
            sqsMenu();
        },1500);
    } else {
        sqsMenu()
    }
}

export{
    purgarSqs
}