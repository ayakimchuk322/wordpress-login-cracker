const agenda_config = require('./config/agenda_config.js');
const chalk = require('chalk');
const fs = require('fs');
const wp_jobs = require('./wp_jobs.js');
const wp_bf = require('./wp_brute_force.js');

const agenda = agenda_config.agenda;

const input_file = process.env.INPUT_FILE;
var input;

async function init() {
    await agenda_config.connect();
    console.debug('agenda started');
    await agenda.purge(); // Remove old jobs
    console.debug('purged old job(s)');
    await wp_jobs.defineJobs();
    console.debug('defined new job(s)');

    loadInputFile();

    wp_bf.loadPassFile();
}

function processTargets() {
    input.forEach(element => {
        let target = {
            url: element.url,
            users: element.wp_users.split(',')
        };

        processTarget(target);
    });
}

function processTarget(target) {
    wp_jobs.pushTarget(target);
}

function loadInputFile() {
    console.debug('Loading targets file...');
    input = JSON.parse(fs.readFileSync(input_file, 'utf8'));
}

module.exports.init = init;
module.exports.processTargets = processTargets;
