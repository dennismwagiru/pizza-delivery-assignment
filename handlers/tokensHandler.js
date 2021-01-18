/*
 * @created 19/01/2021 - 1:48 AM
 * @project two
 * @author  dennis joel
*/

const handler = {};

handler.init = request => {
    return new Promise((resolve, reject) => {
        const acceptableMethods = ['get','post','put','delete'];
        if (acceptableMethods.indexOf(request.method) > -1) {
            resolve(handler[request.method])(request);
        } else {
            reject(405);
        }
    });
};

// Tokens - post
// Required fields: email, password
// Optional fields: none
handler.post = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
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
