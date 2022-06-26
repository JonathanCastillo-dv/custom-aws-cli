const figlet = require('figlet');
const colors = require('colors');
/**
 * Methodo que nos permite mostrar un banner
 * @param msg (mensaje del banner)
 */
 const banner = (msgBanner,msg)=>{
    console.log(
        colors.red(
            figlet.textSync("Sonqo-cli", {
                font: "ANSI Shadow",
            })
        )
    );
    console.log("======================".green);
    console.log(`${msg}`.green);
    console.log("======================".green);
};

module.exports = {banner};