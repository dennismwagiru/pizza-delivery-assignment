/*
 * @created 21/01/2021 - 8:30 PM
 * @project two
 * @author  dennis joel
*/

// Dependencies
const _validator = require('../lib/validator');
const _data = require("../lib/data");

const helper = {};

helper.validate = (rules, body, callback) => {
    const errors = [];
    const types = ['string', 'number'];
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

helper.authUser = request => {
    return new Promise(((resolve, reject) => {
        const token = typeof(request.headers.token) == 'string' ? request.headers.token : false;
        _data.read('tokens', token).then(data => {
            const email = data.email;
            _data.read('users', email).then(user => {
                delete user.hashedPassword;
                resolve(user);
            }, err => {
                reject(err);
            })
        }, err => {
            reject(err);
        });
    }));
}

module.exports = helper;
