/*
 * @created 19/01/2021 - 1:43 AM
 * @project two
 * @author  dennis joel
*/

const handler = {};

handler.init = request => {
    return new Promise((resolve, reject) => {
        const acceptableMethods = ['post', 'get', 'put', 'delete'];
        if (acceptableMethods.indexOf(request.method) > -1) {
            resolve(handler[request.method](request));
        } else {
            reject(405);
        }
    });
}

// Users - post
// Required fields: name, email, streetAddress, password
// Optional fields: none
handler.post = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Users - get
// Required fields: email
// Optional data: none
handler.get = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Users - put
// Required fields: email
// Optional fields: none
handler.put = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Users - delete
// Required fields: email
// Optional fields: none
handler.delete = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

module.exports = handler;
