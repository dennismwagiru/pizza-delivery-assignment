/*
 * @created 18/01/2021 - 11:45 PM
 * @project two
 * @author  dennis joel
*/


const handlers = {};

handlers.users = (data) => {
    return new Promise((resolve, reject) => {
      const acceptableMethods = ['post', 'get', 'put', 'delete'];
      if (acceptableMethods.indexOf(data.method) > -1) {
          resolve(handlers._users[data.method](data));
      } else {
          reject(405);
      }
    });
}

// Container for the users methods
handlers._users = {};

// Users - post
// Required fields: name, email, streetAddress, password
// Optional fields: none
handlers._users.post = (data) => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Users - get
// Required fields: email
// Optional data: none
handlers._users.get = data => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Users - put
// Required fields: email
// Optional fields: none
handlers._users.put = data => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Users - delete
// Required fields: email
// Optional fields: none
handlers._users.delete = data => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};


handlers.notFound = () => {
    return new Promise((resolve, reject) => {
        resolve(404);
    })
}

module.exports = handlers;
