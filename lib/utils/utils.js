import figlet from 'figlet';
import colors from 'colors';
/**
 * Methodo que nos permite mostrar un banner
 * @param msg (mensaje del banner)
 */
const banner = (msg,msgBanner = 'sonqo-cli')=>{
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

export {banner};