require('dotenv').config();

const chalk = require('chalk');
const wp_manager = require('./wp_manager.js');

async function main() {

    await wp_manager.init();
 
    wp_manager.processTargets();

}

(
    function _main() {
        main();
    }
)();
