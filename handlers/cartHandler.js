/*
 * @created 19/01/2021 - 1:52 AM
 * @project two
 * @author  dennis joel
*/


const handler = {};

handler.init = request => {
    return new Promise((resolve, reject) => {
        const acceptableMethods = ['post','get','put','delete'];
        if (acceptableMethods.indexOf(request.method) > -1){
            resolve(handler[request.method](request));
        } else {
            reject(405);
        }
    });
}

// Shopping Cart - post
// Required fields: item_id
// Optional fields: none
handler.post = (request) => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Shopping Cart - get
// Required fields: id
// Optional fields: none
handler.get = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Shopping Cart - put
// Required fields: id
// Optional fields:
handler.put = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Shopping Cart - delete
// Required fields: id
// Optional fields:
handler.delete = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

module.exports = handler;
