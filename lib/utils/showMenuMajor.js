const { Select } = require('enquirer');
const { s3Menu } = require('../service/s3/s3.js');
const {banner} = require('./utils.js');

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
            console.log("DynamoDB");
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
const showMenuMajor = () => {
    return new Promise((resolve) => {
        console.clear();
        banner("sonqo-cli","Seleccione un Servicio");
        const prompt = new Select({
            name: 'color',
            message: 'Opciones:',
            choices: ['S3', 'Api Gateway', 'DynamoDB', 'Salir']
    });
    prompt.run()
  .then(opt => selectServices(opt))
  .catch(console.error);
    });
};

module.exports = {
    banner,
    showMenuMajor
};
