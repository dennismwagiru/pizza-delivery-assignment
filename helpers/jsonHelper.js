/*
 * @created 19/01/2021 - 2:05 AM
 * @project two
 * @author  dennis joel
*/

const helper = {};

helper.parseJsonObject = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return {};
    }
}


module.exports = helper;
