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
        handler[request.method](request, callback);
    } else {
        callback(405, "Method not allowed.");
    }
};

// Tokens - post
// Required fields: email, password
// Optional fields: none
handler.post = (request, callback) => {
    const rules = {
        email: ['required', 'email'],
        password: ['required']
    };
    validationHelper.validate(rules, request.payload, err => {
        const email = request.payload.email.trim();
        const password = request.payload.password.trim();
        console.log(email, password);
        if (!err) {
            // Lookup user by email
            _data.read('users', email).then(userData => {
                // Hash the sent password and compare it to the password in User Data
                const hashedPassword = appHelper.hash(password);
                if (hashedPassword === userData.hashedPassword) {
                    const tokenId = appHelper.createRandomString(20);
                    const expiresAt = Date.now() + 100 * 60 * 60;
                    const tokenObject = {
                        'email': email,
                        'id': tokenId,
                        'expires': expiresAt
                    };
                    _data.create('tokens', tokenId, tokenObject).then(() => {
                        callback(200, tokenObject);
                    }, err => {
                        callback(500, {errors: err});
                    });
                } else {
                    callback(400, {errors: 'Password did not match the specified use\'s stored password'});
                }
            }, err => {
                callback(400, {errors: err});
            })

        } else {
            callback(400, {errors: err});
        }
    })
};

// Tokens - get
// Required fields: id
// Optional fields: none
handler.get = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Tokens - put
// Required fields: id, extend
// Optional fields: none
handler.put = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Tokens - delete
// Required fields: id
// Optional fields: none
handler.delete = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

module.exports = handler;
