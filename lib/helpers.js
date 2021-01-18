/*
 * @created 18/01/2021 - 10:52 PM
 * @project two
 * @author  dennis joel
*/

const helpers = {};

helpers.parseJsonObject = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return {};
    }
}


module.exports = helpers;
