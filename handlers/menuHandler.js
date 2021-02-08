/*
 * @created 19/01/2021 - 1:50 AM
 * @project two
 * @author  dennis joel
*/

// Dependencies
const appHelper = require('../helpers/appHelper');
const validationHelper = require('../helpers/validationHelper');
const _data = require('../lib/data');

const handler = {};

handler.init = (request, callback) => {

        const acceptableMethods = ['get', 'post', 'put', 'delete'];
        if (acceptableMethods.indexOf(request.method) > -1) {
            handler[request.method](request, callback);
        } else {
            callback(405, 'Method not allowed');
        }
};

// Menu - post
// Required fields: name, description, price
// Optional fields: none
handler.post = (request, callback) => {
    const payload = request.payload;
    const rules = {
        name: ['required'],
        description: ['required'],
        price: ['required'] //TODO ADD number validation
    };
    validationHelper.validate(rules, payload, err => {
        if (!err) {
            const id = appHelper.uuidv4();
            const menuItemObject = {
                'id': id,
                'name': payload.name,
                'description': payload.description,
                'price': payload.price
            };

            // Store the menu item
            _data.create('menu', id, menuItemObject).then(() => {
                callback(200);
            }, () => callback(500, {'Error': 'An item with that id already exists'}))
        } else {
            callback(400, {errors: err})
        }
    })
};

// Menu - get
// Required fields: id
// Optional fields: none
handler.get = (request, callback) => {
    const rules = {
        id: ['required']
    };
    validationHelper.validate(rules, request.queryString, err => {
        console.log(callback);
        if (!err) {
            _data.read('menu', request.queryString.id).then(data => {
                callback(200, data);
            }, err => {
                callback(404)
            })
        } else {
            callback(400, {errors: err});
        }
    })
};

// Menu - list


// Menu - put
// Required fields: id
// Optional fields: name, description, price (At least one must be selected)
handler.put = (request, callback) => {
    //TODO Add validation for optional parameters
    const rules = {
        id: ['required']
    };
    validationHelper.validate(rules, request.payload, err => {
        if (!err) {
            callback(200)
        } else {
            callback(400, {errors: err});
        }
    })
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Menu - delete
// Required fields: id
// Optional fields: none
handler.delete = (request, callback) => {
    const rules = {
        id: ['required']
    };
    validationHelper.validate(rules, request.queryString, err => {
        if (!err) {
            _data.delete('menu', request.queryString.id).then(() => {
                callback(200);
            }, err => {
                callback(400, {'Error': 'Could not find the specified item'});
            })
        } else {
            callback(400, {errors: err});
        }
    })
};

module.exports = handler;
