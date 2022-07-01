import util from 'node:util';
import { exec as execNonPromise } from 'child_process';
const exec = util.promisify(execNonPromise);
import { banner } from '../../utils/utils.js';
import { confirm, optionMenuSelect, menuMultiSelect } from '../../utils/enquirer.js';
import ora from 'ora';

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
    spinner.color ='red'
    const dataBucket = await getBucketAndOwner();
    if(dataBucket){
        spinner.stop();
    }
    const bucketSelect = await selectBuckets(dataBucket);
    if (bucketSelect) {
        bucketSelect.map(bucketName => {
            const { stderr } = exec(`aws s3 rb s3://${bucketName} --force`);
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log("Se elimino correctamente:", bucketName);
        })
    }
    setTimeout(() => {
        s3Menu();
    }, 1000);

}

/**
 * Funcion que obtiene buckets y owner de la cuenta de aws.
 * @returns retorna los buckets y owner
 */
const getBucketAndOwner = async () => {
    const { stdout, stderr } = await exec('aws s3api list-buckets');
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    const buckets = JSON.parse(stdout).Buckets.map(b => b.Name);
    const owner = JSON.parse(stdout).Owner.DisplayName;
    return { buckets, owner };
};

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
