var fileOperationService = {};

// Write file binary
fileOperationService.fileOperation = (paramsObject, callback) => {

    var filePath = './file/file.txt';
    require('fs').writeFile(filePath, paramsObject.file.data, 'binary', function (err, result) {
        if (err)
            callback({ message: "INTERNAL SERVER ERROR " + err, status: 'error', statusCode: '500' });
        else
            callback(null, { message: "File Stored successfully", status: 'success', statusCode: 200 });
    });
}
// Write file base64
fileOperationService.fileOperations = (paramsObject, callback) => {

    var filePath = './file/file2.txt';
    require('fs').writeFile(filePath, paramsObject.file, 'base64', function (err, result) {
        if (err)
            callback({ message: "INTERNAL SERVER ERROR " + err, status: 'error', statusCode: '500' });
        else
            callback(null, { message: "File Stored successfully", status: 'success', statusCode: 200 });
    }); 
}
// Read text file
fileOperationService.fileOperationRead = (callback) => {

    var filePath = './file/file2.txt';
    require('fs').readFile(filePath, 'utf8', function (err, result) {
        if (err)
            callback({ message: "INTERNAL SERVER ERROR " + err, status: 'error', statusCode: '500' });
        else
            callback(null, { message: "File Stored successfully", data: [result], status: 'success', statusCode: 200 });
    });
}

module.exports = fileOperationService;