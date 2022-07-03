import ora from 'ora';
import colors from 'colors';
import { confirm, menuMultiSelect } from '../../../helpers/enquirer.js';
import { s3Menu } from '../s3.js';
import { execCommand } from '../../../helpers/functions.js';

/**
 *Funcion que recibe como parametros buckets de aws y permite seleccionarlos.
 * @param {*} buckets Recibe como parametro un  array de buckets y datos del owner.
 * @returns {Array} Retorna un array de buckets seleccionados.
 */
const selectBuckets = async ({ buckets, owner }) => {

    const resultBucket = await menuMultiSelect(buckets, `Hola ${owner} Seleccione los buckets a Eliminar`);

    console.log('Buckets Seleccionados:\n', resultBucket)

    const iscorrect = await confirm('Los Buckets seleccionados son correctos?');

    if (iscorrect) return resultBucket

    s3Menu();
}

/**
 *Metodo que permite eliminar los buckets seleccionados.
 */
const deleteBucket = async () => {
    const spinner = ora('Cargando...').start();
    spinner.color = 'red'

    const dataBucket = await getBucketAndOwner();

    if (dataBucket) {
        spinner.stop();
    }

    const bucketSelect = await selectBuckets(dataBucket);
    if (bucketSelect) {
        bucketSelect.map(async (bucketName) => {
            const commandExec = `aws s3 rb s3://${bucketName} --force`;

            await execCommand(commandExec);

            console.log("Se elimino correctamente:", bucketName.green);

        })
        setTimeout(() => {
            s3Menu();
        }, 2000);
    }
}

/**
 * Funcion que obtiene buckets y owner de la cuenta de aws.
 * @returns retorna los buckets y owner
 */
const getBucketAndOwner = async () => {
    const commandExec = 'aws s3api list-buckets';

    const { stdout } = await execCommand(commandExec)

    const buckets = JSON.parse(stdout).Buckets.map(b => b.Name);

    const owner = JSON.parse(stdout).Owner.DisplayName;

    return { buckets, owner };
};



export {
    deleteBucket
}