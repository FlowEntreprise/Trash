
module.exports = Download;

function Download(uri){
    request = require('request').defaults({encoding:null});

    request.get(uri,function(error,response,body){
        if(!error){
            data = ";base64," + new Buffer(body).toString('base64');
            console.log(data);
        }
        else{
            console.log('Error');
        }
    })



}