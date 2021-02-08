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
        handler[request.method](request, callback)
    } else {
        callback(405, 'Method not allowed');
    }
}

// Users - post
// Required fields: name, email, streetAddress, password
// Optional fields: none
handler.post = (request, callback) => {
    const payload = request.payload;
    const rules = {
        name: ['required'],
        email: ['required','email'],
        address: ['required'],
        password: ['required']
    };
    validationHelper.validate(rules, payload, (err) => {
        if (!err) {
            const hashedPassword = appHelper.hash(payload.password);
            const userObject = {
                'name': payload.name,
                'email': payload.email,
                'address': payload.address,
                'hashedPassword': hashedPassword
            };

            // Store the user
            _data.create('users', payload.email, userObject).then(() => {
                callback(200);
            }, () => callback(500, {'Error': 'A user with that email already exists'}));
        } else {
            callback(400, {errors: err});
        }
    });
};

// Users - get
// Required fields: none
// Optional fields: none
handler.get = (request, callback) => {
    validationHelper.authUser(request).then(user => {
        callback(200, user);
    }, err => {
        callback(401, {errors: err});
    });
};

// Users - put
// Required fields: none
// Optional fields: none
handler.put = (request, callback) => {
    validationHelper.authUser(request).then(user => {
        callback(200, user);
    }, err => {
        callback(401, {errors: err});
    });
};

// Users - delete
// Required fields: none
// Optional fields: none
handler.delete = (request, callback) => {
    validationHelper.authUser(request).then(user => {
        _data.delete('users', user.email).then(res => {
            callback(200);
        }, err => {
            callback(400, {errors: err});
        })
    }, err => {
        callback(401, {errors: err});
    });
};

module.exports = handler;
