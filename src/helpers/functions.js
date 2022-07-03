import util from 'node:util';
import { exec as execNonPromise } from 'child_process';
const exec = util.promisify(execNonPromise);
import figlet from 'figlet';
import colors from 'colors';
import fs from 'fs';
const fsPromises = fs.promises;

/**
 * Methodo que nos permite mostrar un banner
 * @param msg (mensaje del banner)
 */
const banner = (msg, msgBanner = 'sonqo-cli') => {
    console.log(
        colors.red(
            figlet.textSync(msgBanner, {
                font: "ANSI Shadow",
            })
        )
    );
    console.log("======================".green);
    console.log(`${msg}`.green);
    console.log("======================".green);
};

/**
 *Función que recibe por parámetro comandos y los ejecuta
 */
const execCommand = async (command) => {
    try {
        const result = await exec(command);
        return result;
    } catch (error) {
        console.error('Error!:', error)
    }

}

/**
 *Función que recibe un path y devuelve un true o false si existe o no
 * @param {*} path 
 * @returns Boolean
 */
const existDir = (path) => {
    return fs.existsSync(path)
};

/**
 * Metodo encargada de crear una carpeta, recibe el path donde se desea crear la carpeta
 * @param {*} path 
 */
const createDir = async (path) => {
    await fsPromises.mkdir(path);
}

/**
 * Metodo encargado de escribir un archivo.
 * @param {*} pathFile ruta del archivo (si no existe lo crea)
 * @param {*} data datos que se cargaran al archivo
 */
const writeFile = async (pathFile, data) => {
    await fsPromises.writeFile(pathFile, data)
}

export {
    banner,
    execCommand,
    existDir,
    createDir,
    writeFile
}