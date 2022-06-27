const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const { Select } = require('enquirer');
const { banner } = require('../../utils/utils');
const { MultiSelect } = require('enquirer');
const { Confirm } = require('enquirer');

/**
 *Funcion que recibe como parametros buckets de aws y permite seleccionarlos.
 * @param {*} buckets Recibe como parametro un  array de buckets y datos del owner.
 * @returns {Array} Retorna un array de buckets seleccionados.
 */
const selectBuckets = async({ buckets, owner }) => {
    const select = new MultiSelect({
        message: `Hola ${owner} Seleccione los buckets a Eliminar`,
        limit: 7,
        choices: buckets
    });
    const bucketSelect = await select.run()
    console.log('Buckets Seleccionados:\n',bucketSelect)
    const confirm = new Confirm({
        name: 'question',
        message: 'Los Buckets seleccionados son correctos?'
    });
    const correct = await confirm.run();
    if(correct){
        return bucketSelect
    }else{
        s3Menu();
    }

}

/**
 *Metodo que permite eliminar los buckets seleccionados.
 */
const deleteBucket = async () => {
    const dataBucket = await getBucketAndOwner();
    const bucketSelect = await selectBuckets(dataBucket);
    if(bucketSelect){
        bucketSelect.map(bucketName =>{
            const { stdout, stderr } =  exec(`aws s3 rb s3://${bucketName} --force`);
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log("Se elimino correctamente:",bucketName);
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
const s3Menu = () => {
    console.clear();
    banner("sonqo-cli", "Seleccione una Opcion");
    const prompt = new Select({
        type: "select",
        message: "Opciones:",
        choices: ["Delete Buckets", "Salir"],
    });
    prompt
        .run()
        .then((opt) => selectOptS3(opt))
        .catch(console.error);
}


module.exports = {
    s3Menu
}
