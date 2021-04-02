/*
 * @created 18/01/2021 - 9:59 PM
 * @project two
 * @author  dennis joel
*/

const fs = require('fs');
const path = require('path');
const jsonHelper = require('../helpers/appHelper');

const lib = {};

lib.basDir = path.join(__dirname, '/../.data/');

lib.create = (dir, file, data) => {
    return new Promise((resolve, reject) => {
        // Check whether folder exists and create it if it doesn't
        if (!fs.existsSync(lib.basDir+dir)) {
            fs.mkdirSync(lib.basDir+dir);
        }
        fs.promises.open(lib.basDir + dir + '\\' + file + '.json', 'wx')
            .then(fileHandle => {
                // Convert data to a string
                const stringData = JSON.stringify(data);

                fs.promises.writeFile(fileHandle, stringData).then(() => {
                    resolve();
                }, err => {
                    reject(err);
                }).finally(() => {
                        fileHandle.close().then(
                            () => {
                            },
                            err => {
                                reject(err);
                            }
                        );
                    }
                );
            }, err => {
                reject(err);
            });
    });
};

// Read data from a file
lib.read = (dir, file) => {
    return new Promise((resolve, reject) => {
        fs.promises.readFile(lib.basDir+dir+'/'+file+'.json', 'utf-8')
            .then(data => {
                const parsedData = jsonHelper.parseJsonObject(data);
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

// Get all items in a directory as an array
lib.asArray = async (dir) => {
    const files = await lib.list(dir);

    const promises = files.map(file => fs.promises.readFile(lib.basDir+dir+'/'+file+'.json', 'utf-8'));

    return new Promise(resolve => {
        Promise.all(promises).then(data => {
            resolve(data.map(el => jsonHelper.parseJsonObject(el)));
        });
    });
}

module.exports = lib;
