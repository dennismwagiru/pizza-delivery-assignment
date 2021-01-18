/*
 * @created 18/01/2021 - 11:45 PM
 * @project two
 * @author  dennis joel
*/


const handlers = {};

// Users
handlers.users = (request) => {
    return new Promise((resolve, reject) => {
      const acceptableMethods = ['post', 'get', 'put', 'delete'];
      if (acceptableMethods.indexOf(request.method) > -1) {
          resolve(handlers._users[request.method](request));
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
handlers._users.post = (request) => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Users - get
// Required fields: email
// Optional data: none
handlers._users.get = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Users - put
// Required fields: email
// Optional fields: none
handlers._users.put = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Users - delete
// Required fields: email
// Optional fields: none
handlers._users.delete = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};


// Tokens
handlers.tokens = request => {
    return new Promise((resolve, reject) => {
        const acceptableMethods = ['get','post','put','delete'];
        if (acceptableMethods.indexOf(request.method) > -1) {
            resolve(handlers._tokens[request.method])(request);
        } else {
            reject(405);
        }
    });
};

// Container for tokens' methods
handlers._tokens = {}

// Tokens - post
// Required fields: email, password
// Optional fields: none
handlers._tokens.post = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Tokens - get
// Required fields: id
// Optional fields: none
handlers._tokens.get = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Tokens - put
// Required fields: id, extend
// Optional fields: none
handlers._tokens.put = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Tokens - delete
// Required fields: id
// Optional fields: none
handlers._tokens.delete = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Menu
handlers.menu = request => {
    return new Promise((resolve, reject) => {
       const acceptableMethods = ['get', 'post', 'put', 'delete'];
       if (acceptableMethods.indexOf(request.method) > -1) {
           handlers._menu[request.method](request);
       } else {
           reject(405);
       }
    });
};

// Container for menu items
handlers._menu = {};

// Menu - post
// Required fields: name, description, price
// Optional fields: none
handlers._menu.post = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Menu - get
// Required fields: id
// Optional fields: none
handlers._menu.get = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Menu - put
// Required fields: id
// Optional fields: name, description, price (At least one must be selected)
handlers._menu.put = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Menu - delete
// Required fields: id
// Optional fields: none
handlers._menu.delete = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Shopping Cart
handlers.cart = request => {
   return new Promise((resolve, reject) => {
       const acceptableMethods = ['post','get','put','delete'];
       if (acceptableMethods.indexOf(request.method) > -1){
           resolve(handlers._cart[request.method](request));
       } else {
           reject(405);
       }
   });
};

// Shopping Cart container
handlers._cart = {};

// Shopping Cart - post
// Required fields: item_id
// Optional fields: none
handlers._cart.post = (request) => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Shopping Cart - get
// Required fields: id
// Optional fields: none
handlers._cart.get = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Shopping Cart - put
// Required fields: id
// Optional fields:
handlers._cart.put = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Shopping Cart - delete
// Required fields: id
// Optional fields:
handlers._cart.delete = request => {
    return new Promise((resolve, reject) => {
        resolve(200);
    });
};

// Not found
handlers.notFound = () => {
    return new Promise((resolve, reject) => {
        resolve(404);
    });
};

module.exports = handlers;
