/*
 * @created 21/01/2021 - 8:30 PM
 * @project two
 * @author  dennis joel
*/

// Dependencies
const _validator = require('../lib/validator');
const _data = require("../lib/data");

const helper = {};

helper.validate = (rules, body) => {
    return new Promise((resolve, reject) => {
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
        if (errors.length > 0) reject({ statusCode: 400, payload: errors});
        else resolve();
    })
}

helper.isTokenValid = (token, email) => {
   return new Promise((resolve, reject) => {
       _data.read('tokens', token).then(tokenData => {
           if (tokenData.email === email && tokenData.expires > Date.now()) {
               resolve();
           } else {
               reject({ statusCode: 403, payload: {'Error': 'Missing required token in header, or token is invalid' } });
           }
       }, () => {
           reject({ statusCode: 403, payload: {'Error': 'Missing required token in header, or token is invalid' } });
       });
   })
}

helper.isLoggedIn = token => {
    return new Promise((resolve, reject) => {
        _data.read('tokens', token).then(tokenData => {
            if (tokenData.expires > Date.now()) {
                resolve();
            } else {
                reject({ statusCode: 403, payload: {'Error': 'Missing required token in header, or token is invalid' } });
            }
        }, () => {
            reject({ statusCode: 403, payload: {'Error': 'Missing required token in header, or token is invalid' } });
        });
    })
}

helper.isAdmin = token => {
    return new Promise((resolve, reject) => {
        _data.read('tokens', token).then(tokenData => {
            if (tokenData.expires > Date.now()) {
                _data.read('users', tokenData.email).then(user => {
                    if (user?.isAdmin)
                        resolve();
                    else {
                        reject({ statusCode: 403, payload: { 'Error': 'Permission Denied' } });
                    }
                }, err => reject({ statusCode: 403, payload: {'Error': 'Authenticated user does not exist.'} }))
            } else {
                reject({ statusCode: 403, payload: {'Error': 'Missing required token in header, or token is invalid' } });
            }
        }, () => {
            reject({ statusCode: 403, payload: {'Error': 'Missing required token in header, or token is invalid' } });
        });
    })
}

module.exports = helper;
