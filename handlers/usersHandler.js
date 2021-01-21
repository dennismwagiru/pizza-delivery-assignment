/*
 * @created 19/01/2021 - 1:43 AM
 * @project two
 * @author  dennis joel
*/

// Dependencies
const validationHelper = require('../helpers/validationHelper');

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
    const rules = {
        name: ['required'],
        email: ['required','email'],
        address: ['required'],
        password: ['required']
    };
    validationHelper.validate(rules, request.payload, (err) => {
        if (!err) {
            callback(200);
        } else {
            callback(400, {errors: err});
        }
    });
};

// Users - get
// Required fields: email
// Optional data: none
handler.get = request => {
    const rules = {
        email: ['required','email'],
    };
    validationHelper.validate(rules, request.payload, (err) => {
        if (!err) {
            callback(200);
        } else {
            callback(400, {errors: err});
        }
    });
};

// Users - put
// Required fields: email
// Optional fields: none
handler.put = request => {
    const rules = {
        email: ['required','email'],
    };
    validationHelper.validate(rules, request.payload, (err) => {
        if (!err) {
            callback(200);
        } else {
            callback(400, {errors: err});
        }
    });
};

// Users - delete
// Required fields: email
// Optional fields: none
handler.delete = request => {
    const rules = {
        email: ['required','email'],
    };
    validationHelper.validate(rules, request.payload, (err) => {
        if (!err) {
            callback(200);
        } else {
            callback(400, {errors: err});
        }
    });
};

module.exports = handler;
