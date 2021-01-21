/*
 * @created 21/01/2021 - 8:30 PM
 * @project two
 * @author  dennis joel
*/

// Dependencies
const _validator = require('../lib/validator');

const helper = {};

helper.validate = (rules, body, callback) => {
    const errors = [];
    for (let attr in rules) {
        const attrRules = rules[attr];
        const inputValue = body.hasOwnProperty(attr) ? body[attr] : null;
        attrRules.forEach(rule => {
            _validator._rules[rule](attr, inputValue, (err) => {
                if (err) errors.push(err);
            });
        });
    }
    callback(errors.length > 0 ? errors : false);
}

module.exports = helper;
