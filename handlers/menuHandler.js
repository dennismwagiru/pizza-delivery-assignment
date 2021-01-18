/*
 * @created 19/01/2021 - 1:50 AM
 * @project two
 * @author  dennis joel
*/

const handler = {};

handler.init = request => {
    return new Promise((resolve, reject) => {
        const acceptableMethods = ['get', 'post', 'put', 'delete'];
        if (acceptableMethods.indexOf(request.method) > -1) {
            resolve(handler[request.method](request));
        } else {
            reject(405);
        }
    });
};

// Menu - post
// Required fields: name, description, price
// Optional fields: none
handler.post = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Menu - get
// Required fields: id
// Optional fields: none
handler.get = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Menu - put
// Required fields: id
// Optional fields: name, description, price (At least one must be selected)
handler.put = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Menu - delete
// Required fields: id
// Optional fields: none
handler.delete = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

module.exports = handler;
