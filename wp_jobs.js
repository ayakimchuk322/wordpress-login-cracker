const agenda_config = require('./config/agenda_config.js');
const chalk = require('chalk');
const wp_bf = require('./wp_brute_force.js');

const agenda = agenda_config.agenda;

async function defineJobs() {
    await agenda.define('bruteforcing wp', async (job) => {
        const data = job.attrs.data;
        await wp_bf.bruteForceTarget(data);
    });
}

function pushTarget(target) {
    agenda.now('bruteforcing wp', target);
}

module.exports.defineJobs = defineJobs;
module.exports.pushTarget = pushTarget;
