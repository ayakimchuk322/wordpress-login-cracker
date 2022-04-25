const wp_login = require('../wp_login.js');

(
    async function main() {

        let url = '';
        let method = 'post';
        let user = 'admin';
        let passwords = ['12345'];

        await wp_login.doLogin(url, method, user, passwords);
    }
)();
