

import { exec, spawnSync } from 'node:child_process'
import { promptFields } from '../../helpers/enquirer.js';
import { execCommand } from '../../helpers/functions.js';
import { showMenuMajor } from '../../index.js';



const loginPersonalAccount = async () => {
    await spawnSync('aws', ['configure'], {
        cwd: process.cwd(),
        stdio: 'inherit'
    })
    showMenuMajor()
}

const loginBusinessAccount = async () => {

    await spawnSync('aws', ['configure'], {
        cwd: process.cwd(),
        stdio: 'inherit'
    })

    const accessToken = await promptFields({
        initial: '****',
        message: 'Enter your aws_session_token'
    })

    execCommand(`aws configure set aws_session_token ${accessToken}`);

    showMenuMajor()
}


export { loginPersonalAccount, loginBusinessAccount };