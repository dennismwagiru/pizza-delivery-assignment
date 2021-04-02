/*
 * @created 19/01/2021 - 1:48 AM
 * @project two
 * @author  dennis joel
*/

// Dependencies
const validationHelper = require('../helpers/validationHelper');
const appHelper = require('../helpers/appHelper');
const _data = require('../lib/data');

const handler = {};

handler.init = (request, callback) => {
    const acceptableMethods = ['get','post','put','delete'];
    if (acceptableMethods.indexOf(request.method) > -1) {
        handler[request.method](request).then(payload => {
                callback(200, payload)
            }, ({statusCode, payload}) => {
                callback(statusCode, payload)
            });
    } else {
        callback(405, "Method not allowed.");
    }
};

// Tokens - post
// Required fields: email, password
// Optional fields: none
handler.post = (request) => {
    return new Promise((resolve, reject) => {
        const rules = {
            email: ['required', 'email'],
            password: ['required']
        };
        validationHelper.validate(rules, request.payload).then(() => {
            const email = request.payload.email.trim();
            const password = request.payload.password.trim();
            console.log(email, password);
                // Lookup user by email
                _data.read('users', email).then(userData => {
                    // Hash the sent password and compare it to the password in User Data
                    const hashedPassword = appHelper.hash(password);
                    if (hashedPassword === userData.hashedPassword) {
                        const tokenId = appHelper.createRandomString(20);
                        const expiresAt = Date.now() + 1000 * 60 * 60;
                        const tokenObject = {
                            'email': email,
                            'id': tokenId,
                            'expires': expiresAt
                        };
                        _data.create('tokens', tokenId, tokenObject).then(() => {
                            resolve(tokenObject);
                        }, err => {
                            reject({ statusCode: 500, payload: { errors: err } });
                        });
                    } else {
                        reject({ statusCode: 400, payload: { errors: 'Password did not match the specified use\'s stored password' } });
                    }
                }, err => {
                    reject({ statusCode: 400, payload: { errors: err } });
                })
        }, err => reject(err));
    })
};

// Tokens - get
// Required fields: id
// Optional fields: none
handler.get = request => {
    return new Promise((resolve, reject) => {
        const rules = {id: ['required']}
        validationHelper.validate(rules, request.queryString).then(() => {
            _data.read('tokens', request.queryString.id).then(tokenData => {
                resolve(tokenData);
            }, err => {
                reject({ statusCde: 404 });
            })
        }, err => reject(err));
    });
};

// Tokens - put
// Required fields: id, extend
// Optional fields: none
handler.put = request => {
    return new Promise((resolve, reject) => {
        const rules = {id: ['required'], extend: ['required', 'boolean']}
        validationHelper.validate(rules, request.payload).then(() => {
            if (request.payload.extend === true) {
                _data.read('tokens', request.payload.id).then(tokenData => {
                    if (tokenData.expires > Date.now()) {
                        tokenData.expires = Date.now() + 1000 * 60 * 60;

                        // Store the new updates
                        _data.update('tokens', request.payload.id, tokenData).then(() => {
                            resolve();
                        }, err => reject({ statusCode: 400, payload: { 'Error': 'Could not update the token\'s expiration.' } }));
                    } else {
                        reject({ statusCode: 400, payload: { 'Error': 'The token has already expired and cannot be extended' } });
                    }
                }, err => reject({ statusCode: 404, payload: { 'Error': 'Specified token does not exist' } }));
            } else {
                reject({ statusCode: 400, payload: { 'Error': 'Extend should be true' } });
            }
        }, err => reject(err));
    });
};

// Tokens - delete
// Required fields: id
// Optional fields: none
handler.delete = request => {
    return new Promise((resolve, reject) => {
        const rules = {id: ['required']};
        validationHelper.validate(rules, request.queryString).then(() => {
            _data.read('tokens', request.queryString.id).then(tokenData => {
                _data.delete('tokens', request.queryString.id).then(() => {
                    resolve();
                }, err => reject({ statusCode: 500, payload: { 'Error': 'Could not delete the specified token.' } }));
            }, err => reject({ statusCode: 404, payload: { 'Error': 'Could not find the specified token.' } }));
        }, err => reject(err));
    });
};

module.exports = handler;
