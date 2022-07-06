import { exec, spawn } from 'node:child_process'

// run the grep command
const command = spawn('aws',['configure'], {
    cwd: process.cwd(),
    stdio: 'inherit'
})