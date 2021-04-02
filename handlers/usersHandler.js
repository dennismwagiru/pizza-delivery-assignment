/*
 * @created 19/01/2021 - 1:43 AM
 * @project two
 * @author  dennis joel
*/

// Dependencies
const appHelper = require('../helpers/appHelper');
const validationHelper = require('../helpers/validationHelper');
const _data = require('../lib/data');

const handler = {};

handler.init = (request, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(request.method) > -1) {
        handler[request.method](request).then(payload => {
            callback(200, payload);
        }, ({statusCode, payload}) => {
            callback(statusCode, payload);
        })
    } else {
        callback(405, 'Method not allowed');
    }
}

// Users - post
// Required fields: name, email, streetAddress, password
// Optional fields: none
handler.post = (request) => {
    return new Promise((resolve, reject) => {
        const payload = request.payload;
        const rules = {
            name: ['required'],
            email: ['required','email'],
            address: ['required'],
            password: ['required']
        };
        validationHelper.validate(rules, payload).then(() => {
            const hashedPassword = appHelper.hash(payload.password.trim());
            const userObject = {
                'name': payload.name,
                'email': payload.email,
                'address': payload.address,
                'hashedPassword': hashedPassword
            };

            // Store the user
            _data.create('users', payload.email, userObject).then(() => {
                    resolve()
                }, () => {
                    reject({ statusCode: 500, payload: { 'Error': 'A user with that email already exists' } })
                }
            );
        }, err => {
            reject(err);
        })
    })
};

// Users - get
// Required fields: none
// Optional fields: none
handler.get = (request) => {
    return new Promise((resolve, reject) => {
        const queryString = request.queryString;
        const rules = {email: ['required', 'email']}
        validationHelper.validate(rules, queryString).then(() => {
            const token = typeof (request.headers.token) == 'string' ? request.headers.token : false
            validationHelper.isTokenValid(token, queryString.email).then(() => {
                _data.read('users', queryString.email).then(user => {
                    delete user.hashedPassword;
                    resolve(user);
                }, err => {
                    reject({ statusCode: 400 });
                });
            }, err => reject(err));
        }, err => reject(err));
    })
};

// Users - put
// Required fields: none
// Optional fields: none
handler.put = (request) => {
    return new Promise((resolve, reject) => {
        const queryString = request.queryString;
        let rules = {
            email: ['required', 'email']
        };
        validationHelper.validate(rules, queryString).then(() => {
            const token = typeof (request.headers.token) == 'string' ? request.headers.token : false
            validationHelper.isTokenValid(token, queryString.email).then(() => {
                const payload = request.payload;
                const password = typeof(payload.password) == 'string' && payload.password.trim().length > 0 ? payload.password.trim() : false;
                _data.read('users', queryString.email).then(userData => {
                    userData.name = payload.name ?? userData.name;
                    userData.address = payload.address ?? userData.address;
                    if (password)
                        userData.hashedPassword = appHelper.hash(password)
                    _data.update('users', queryString.email, userData).then(() => {
                        resolve('s')
                    }, err => {
                        console.log(err);
                        reject({ statusCode: 500, payload: { 'Error': 'Could not update the user.' } });
                    })
                }, err => reject({ statusCode: 400, payload: { 'Error': 'Specified user does not exist' } }));
            }, err => reject(err));
        }, err => reject(err));
    });
};

// Users - delete
// Required fields: none
// Optional fields: none
handler.delete = (request) => {
    return new Promise((resolve, reject) => {
        const queryString = request.queryString;
        const rules = {email: ['required', 'email']};
        validationHelper.validate(rules, queryString).then(() => {
            const token = typeof (request.headers.token) == 'string' ? request.headers.token : false
            validationHelper.isTokenValid(token, queryString.email).then(() => {
                _data.delete('users', queryString.email).then(() => {
                    resolve(200);
                }, err => {
                    reject({ statusCode: 400, payload: { errors: err } });
                })
            }, err => reject(err));
        }, err => reject(err));
    });
};

module.exports = handler;
