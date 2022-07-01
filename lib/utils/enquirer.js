import pkg from 'enquirer';
const { Confirm, MultiSelect, Select } = pkg;;

/**
 *Función de confirmación donde recibe un mensaje y permite retornar true o false
 * @param {*} message
 * @returns
 */
const confirm = async (message) => {
    const confirm = new Confirm({
        name: 'question',
        message
    });
    return await confirm.run();
}

/**
 *Función que recibe un array de opciones y un mensaje.
 * @param {*} choices
 * @param {*} message
 * @returns  Retorna los elementos seleccionados
 */
const menuMultiSelect = async (choices, message) => {
    const select = new MultiSelect({
        message,
        limit: 7,
        choices
    });
    return await select.run()
}

/**
 * Función que recibe un array de opciones y un mensaje.
 * @param {*} choices
 * @param {*} message
 * @returns  Retorna solo una opcion seleccionada
 */
const optionMenuSelect = async (choices, message) => {
    const option = new Select({
        type: "select",
        message,
        choices
    });
    return await option.run()
}

export {
    confirm,
    menuMultiSelect,
    optionMenuSelect
}