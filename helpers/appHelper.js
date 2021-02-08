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

helpers.createRandomString = (strLength) => {
    strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
    if (strLength) {
        const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

        let str = '';
        for (i = 1; i <= strLength; i++) {
            const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
            str += randomCharacter;
        }

        return str;
    }else {
        return false;
    }
}

helpers.uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = helpers;
