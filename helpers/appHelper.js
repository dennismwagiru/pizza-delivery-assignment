/*
 * @created 19/01/2021 - 2:05 AM
 * @project two
 * @author  dennis joel
*/

// Dependencies
const crypto = require('crypto');

const helpers = {};

helpers.parseJsonObject = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return {};
    }
}

helpers.hash = (str) => {
    return crypto.createHmac('sha256', 'ThisIsMySecret').update(str).digest('hex');
}

module.exports = helpers;
