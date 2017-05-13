var http = require('http');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');

http.createServer(function(request,response){
    if(request.url==='/fileupload'&&request.method==='POST'){
        var form = new formidable.IncomingForm();
        form.encoding = 'utf8';
        form.uploadDir = './fileuploads';
        form.parse(request, function(error,fields,files){
            response.writeHead(200, {'Content-Type':'text/plain'});
            response.write('File upload successful');
            response.end();
        });
        form.on('file',function(field,file){
            fs.rename(file.path, form.uploadDir+'/'+file.name);
        });
    }
    else{
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end(
            '<form action="/fileupload" enctype="multipart/form-data" method="post">'+
            '<input type="text" name="title"><br>'+
            '<input type="file" name="upload" multiple="multiple"><br>'+
            '<input type="submit" value="Upload">'+
            '</form>'
        );
    }
}).listen(8888);
console.log('Server running on port 8888');