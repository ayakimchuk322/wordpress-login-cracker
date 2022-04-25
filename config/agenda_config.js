const Agenda = require('agenda');
const chalk = require('chalk');

const mongoConnectionString = "mongodb://127.0.0.1/agenda";
const agenda = new Agenda({ db: { address: mongoConnectionString } });

const maxConcurrency = process.env.MAX_THREADS;

async function connect() {
    agenda.defaultConcurrency(maxConcurrency);
    agenda.maxConcurrency(maxConcurrency);
    await agenda.start();
}

module.exports.agenda = agenda;
module.exports.connect = connect;
