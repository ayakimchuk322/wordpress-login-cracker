const axios = require('axios');
const https = require('https');

function getClient() {
    const agent = new https.Agent({
        rejectUnauthorized: false,
        requestCert: false,
        agent: false,
    });
    return axios.create({
        httpsAgent: agent
    });
}

function getDetectHeaders() {
    return { 
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
    };
}

function getLoginHeaders() {
    return { 
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
    };
}

module.exports.getClient = getClient;
module.exports.getDetectHeaders = getDetectHeaders;
module.exports.getLoginHeaders = getLoginHeaders;
