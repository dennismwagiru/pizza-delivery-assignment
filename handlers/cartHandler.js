/*
 * @created 19/01/2021 - 1:52 AM
 * @project two
 * @author  dennis joel
*/

// Dependencies
const validationHelper = require('../helpers/validationHelper');
const appHelper = require('../helpers/appHelper');
const _data = require('../lib/data');

const handler = {};

handler.init = (request, callback) => {
    const acceptableMethods = ['post','get','put','delete'];
    if (acceptableMethods.indexOf(request.method) > -1){
        validationHelper.authUser(request).then(user => {
            request.user = user;
            handler[request.method](request, callback);
        }, err => {
            callback(401);
        })
    } else {
        callback(405);
    }
};

// Shopping Cart - post
// Required fields: item_id
// Optional fields: none
handler.post = (request, callback) => {
   const payload = request.payload;
   const rules = {
       item_id: ['required'],
       quantity: ['required', 'number']
   }
   validationHelper.validate(rules, payload, err => {
       if (!err) {
           const item_id = payload.item_id;
           let quantity = payload.quantity;
           const user = request.user;
           let cart = user.cart ?? {};
           _data.read('menu', item_id).then(item => {
               if (cart.hasOwnProperty(item_id)) {
                   cart[item_id].quantity += parseInt(quantity);
               } else {
                   cart[item_id] = {quantity: parseInt(quantity), unit_cost: item.price};
               }
               user.cart = cart;
               _data.update('users', user.email, user).then(res => {
                   callback(200, user);
               }, err => {
                   callback(500, {errors: err});
               });
           }, err => {
               callback(400, {errors: err});
           })
       } else {
           callback(400, {errors: err});
       }
   });
};

// Shopping Cart - get
// Required fields: none
// Optional fields: none
handler.get = (request, callback) => {
    callback(200, request.user);
};

// Shopping Cart - put
// Required fields: item_id, quantity
// Optional fields: none
handler.put = (request, callback) => {
    const rules = {
        item_id: ['required'],
        quantity: ['required', 'number']
    }
    validationHelper.validate(rules, request.payload, err => {
        if (!err) {
            let user = request.user;
            const item_id = request.payload.item_id;
            let quantity = request.payload.quantity;
            if (user.cart?.hasOwnProperty(item_id) ?? false) {
                user.cart[item_id].quantity = parseInt(quantity);
                _data.update('users', user.email, user).then(res => {
                    callback(200, user);
                }, err => {
                    callback(500, {errors: err});
                })
            } else {
                callback(400, {errors: "Item does not exist in your shopping cart"});
            }
        } else {
            callback(400, {errors: err});
        }
    });
};

// Shopping Cart - delete
// Required fields: item_id
// Optional fields: none
handler.delete = (request, callback) => {
    const rules = {
        item_id: ['required'],
    }
    validationHelper.validate(rules, request.queryString, err => {
        if (!err) {
            let user = request.user;
            const item_id = request.payload.item_id;
            if (user.cart?.hasOwnProperty(item_id) ?? false) {
                delete user.cart[item_id];
                _data.update('users', user.email, user).then(res => {
                    callback(200, user);
                }, err => {
                    callback(500, {errors: err});
                })
            } else {
                callback(400, {errors: "Item does not exist in your shopping cart"});
            }
        } else {
            callback(400, {errors: err});
        }
    });
};

module.exports = handler;
