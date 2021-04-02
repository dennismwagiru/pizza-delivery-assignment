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
        handler[request.method](request).then(payload => {
            callback(200, payload)
        }, err => {
            callback(err.statusCode, err.payload);
        });
    } else {
        callback(405, 'Method not allowed');
    }
};

// Menu - post
// Required fields: name, description, price
// Optional fields: none
handler.post = (request) => {
    return new Promise((resolve, reject) => {
        validationHelper.isAdmin(request.headers.token).then(() => {
            const payload = request.payload;
            const rules = {
                name: ['required'],
                description: ['required'],
                price: ['required', 'number'] //TODO ADD number validation
            };
            validationHelper.validate(rules, payload).then(() => {
                const id = appHelper.uuidv4();
                const menuItemObject = {
                    'id': id,
                    'name': payload.name,
                    'description': payload.description,
                    'price': payload.price
                };
                // Store the menu item
                _data.create('menu', id, menuItemObject).then(() => {
                    resolve();
                }, () => reject({ statusCode: 500, payload: { 'Error': 'An item with that id already exists' } }));
            }, err => reject(err));
        }, err => reject(err));
    })
};

// Menu - get
// Required fields: none
// Optional fields: id
handler.get = (request) => {
    return new Promise((resolve, reject) => {
        validationHelper.isLoggedIn(request.headers.token).then(() => {
            const id = typeof(request.queryString.id) == 'string' && request.queryString.id.trim().length > 0 ? request.queryString.id : false;
            // If id exists and is valid find and return requested item
            if (id) {
                _data.read('menu', request.queryString.id).then(data => {
                    resolve(data);
                }, err => {
                    reject({statusCode: 404, payload: {'Error': 'Menu Item not found'}});
                });
            } else {
                // Else return entire menu.
                _data.asArray('menu').then(list => {
                    resolve(list);
                }, err => {
                    reject({statusCode: 400, payload: {'Error': 'Unable to read menu list.'} });
                });
            }
        }, err => reject(err));
    });
};

// Menu - list


// Menu - put
// Required fields: id
// Optional fields: name, description, price (At least one must be selected)
handler.put = (request) => {
    return new Promise((resolve, reject) => {
       validationHelper.isAdmin(request.headers.token).then(() => {
           let rules = {
               id: ['required']
           };
           validationHelper.validate(rules, request.queryString).then(() => {
               rules = {
                   price: ['number'],
               }
               validationHelper.validate(rules, request.payload).then(() => {
                   _data.read('menu', request.queryString.id).then(item => {
                       item.name = request.payload.name ?? item.name;
                       item.description = request.payload.description ?? item.description;
                       item.price = request.payload.price ?? item.price;
                       _data.update('menu', request.queryString.id, item).then(() => {
                           resolve()
                       }, err => reject({ statusCode: 500, payload: { 'Error': 'Could not updated item.' }}))
                   }, err => reject({ statusCode: 404, payload: {'Error': 'Specified item does not exist.' } }));
               }, err => reject(err))
           }, err => reject(err));
       }, err => reject(err))
    })
};

// Menu - delete
// Required fields: id
// Optional fields: none
handler.delete = (request) => {
    return new Promise((resolve, reject) => {
        validationHelper.isAdmin(request.headers.token).then(() => {
            const rules = {
                id: ['required']
            };
            validationHelper.validate(rules, request.queryString).then(() => {
                _data.delete('menu', request.queryString.id).then(() => {
                    resolve(200);
                }, err => {
                    reject({ statusCode: 400, payload: { 'Error': 'Could not find the specified item' } });
                });
            }, err => reject(err));
        }, err => reject(err))
    });
};

module.exports = handler;
