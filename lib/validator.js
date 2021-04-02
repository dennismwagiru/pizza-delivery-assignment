/*
 * @created 21/01/2021 - 9:21 PM
 * @project two
 * @author  dennis joel
*/

const validator = {};

validator._rules = {};

/**
 *
 * @param {string} key
 * @param {string} val
 * @param {function} callback
 */
validator._rules.required = (key, val, callback) => {
    if (val !== undefined && val !== null && val.toString().trim().length > 0) {
        callback(false);
    } else {
        callback(`${key} is required`);
    }

};

/**
 *
 * @param {string} key
 * @param {string} val
 * @param {function} callback
 */
validator._rules.string = (key, val, callback) => {
    if (val !== undefined && val !== null && val.trim().length > 0) {
        callback(false);
    } else {
        callback(`${key} should be a string`)
    }
};

/**
 *
 * @param {string} key
 * @param {string} val
 * @param {function} callback
 */
validator._rules.number = (key, val, callback) => {
    if (val !== undefined && val !== null && !isNaN(val)) {
        callback(false);
    } else {
        callback(`${key} should be a number`)
    }
}

/**
 *
 * @param {string} key
 * @param {string} val
 * @param {function} callback
 */
validator._rules.email = (key, val, callback) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    callback(re.test(val) ? false : `${key} requires a valid email.`);
};

validator._rules.boolean = (key, val, callback) => {
    if (typeof(val) == 'boolean') {
        callback(false);
    } else {
        callback(`${key} should be a bool`);
    }
}


module.exports = validator;
