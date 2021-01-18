/*
 * @created 18/01/2021 - 9:59 PM
 * @project two
 * @author  dennis joel
*/

const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');

const lib = {};

lib.basDir = path.join(__dirname, '/../.data/');

lib.create = (dir, file, data) => {
    return new Promise((resolve, reject) => {
        fs.promises.open(lib.basDir+dir+'\\'+file+'.json', 'wx')
            .then(fileHandle => {
                // Convert data to a string
                const stringData = JSON.stringify(data);

                fs.promises.writeFile(fileHandle, stringData).then(() => {
                    resolve();
                }, err => {
                    reject(err);
                }).finally(() => {
                        fileHandle.close().then(
                            () => {},
                            err => {
                                reject(err);
                            }
                        );
                    }
                );
            }, err => {
                reject( err);
            });
    });
};

// Read data from a file
lib.read = (dir, file) => {
    return new Promise((resolve, reject) => {
        fs.promises.readFile(lib.basDir+dir+'/'+file+'.json', 'utf-8')
            .then(data => {
                const parsedData = helpers.parseJsonObject(data);
                resolve(parsedData);
            }, err => {
                reject(err);
            });
    });
};

// Update data in a file
lib.update = (dir, file, data) => {
    return new Promise((resolve, reject) => {
        const path = lib.basDir+dir+'/'+file+'.json';
        fs.promises.open(path, 'r+')
            .then(fileHandle => {
                // Convert data to string
                const stringData = JSON.stringify(data);

                // Truncate the file
                fs.promises.truncate(path)
                    .then(() => {
                        fs.promises.writeFile(fileHandle, stringData)
                            .then(() => {
                                resolve();
                            }, err => {
                                reject(err);
                            })
                            .finally(() => {
                                    fileHandle.close()
                                        .then(
                                            () => {},
                                            err => {
                                                reject(err);
                                            }
                                        );
                                }
                            );
                    }, err => {
                        reject(err);
                    });
            }, err => {
                reject(err);
            });
    });
};

// Delete a file
lib.delete = (dir, file) => {
    return new Promise((resolve, reject) => {
        fs.promises.unlink(lib.basDir+dir+'/'+file+'.json').then(() => {
            resolve();
        }, err => {
            reject(err);
        });
    });
};

// List all the items in a directory
lib.list = (dir) => {
    return new Promise((resolve, reject) => {
        fs.promises.readdir(lib.basDir+dir+'/').then(data => {

            const trimmedFileNames = data.map(filename => {
                return filename.replace('.json', '');
            });
            resolve(trimmedFileNames);
        }, err => {
            reject(err);
        });
    });
};

module.exports = lib;