/*
* Library for storing and editing data
*
*/

// Dependencies
var fs = require('fs');
var path = require('path');

// Container for the module to be exported
var lib = {};

//Base directory of the data folder
lib.baseDir = path.join(__dirname, '../.data/');

//write data to a file
lib.create = function(dir, file, data, callback) {
    // Open the file for writing 
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function(err, fileDescriptor) {
        if(!err && fileDescriptor) {
            var stringData = JSON.stringify(data);

            // Write to file and close it
            fs.writeFile(fileDescriptor, stringData, function(err) {
                if(!err) {
                    fs.close(fileDescriptor, function(err) {
                        if(!err) {
                            callback(false);
                        } else {
                            callback(`error while closing new file`);
                        }
                    })
                } else {
                    callback('Error writing to new File');
                }
            });
        } else {
            callback(`couldn't create a new file, it might have already existed`)
        }
    })
}

// Read data from a file

lib.read = function(dir, file, callback) {
    fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', function (err, data) {
        callback(err, data);
    }) 
}

lib.update = function(dir, file, data, callback) {

// Open the file for writing 
fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', function(err, fileDescriptor) {
    if(!err && fileDescriptor) {
        // convert data to string
        var stringData = JSON.stringify(data);

        // Truncate the file
        fs.truncate(fileDescriptor, function(err){
            if(!err) {
                // Write to the file and close it
                fs.writeFile(fileDescriptor, stringData, function(err){
                    if(!err) {
                        fs.close(fileDescriptor, function(err){
                            if(!err) {
                                callback(false);
                            } else {
                                callback('error closing existing file');
                            }
                        });
                    } else {
                        callback('Error writing to existing file');
                    }
                });
            } else {
                callback('Error truncating the file');
            }
        })
    }
})

}

lib.delete = function(dir, file, callback) {
    // unlink the file 
    fs.unlink(lib.baseDir+dir+'/'+file+'.json', function(err) {
        if(!err) {
            callback(false);
        } else {
            callback('Error deleting file');
        }
    })
}

module.exports = lib;