const async = require('async');
const QRCode = require('qrcode');


const AWS = require('aws-sdk');
const env = require('../../../environments/environment');
AWS.config.update({
    accessKeyId: env.AWS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: 'us-west-1'
});

var s3Bucket = new AWS.S3( { params: {Bucket: 'orientation-qr-codes'} } );

module.exports = {
    async generateLinks(studentData){
        var N = 10; 
        let numbers = Array.apply(null, {length: N}).map(Number.call, Number);
        
        objects = [];
        for (digit in numbers){
            let base64Val = await QRCode.toDataURL(''+digit);
            let keyValue = { id: digit, data: base64Val }
            objects.push(keyValue);
        }

        
        async.eachSeries(objects, function(keyValue, cb) {
            buf = new Buffer(keyValue.data.split(',')[1],'base64')
            
            var params = {
                Key: ''+keyValue.id, 
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: 'image/png',
                ACL:'public-read-write'
            };

            s3Bucket.upload(params, function(err, uploadedInfo) {
                if (err) {
                    console.log('error in callback');
                    console.log(err);
                    cb(err);
                } else {
                    console.log('success');
                    console.log(uploadedInfo.Location);
                    cb();
                }
            });

           
        }, function(err, results) {
            if (err) console.log('one of the uploads failed')
            else {
                console.log('all files uploaded');
            }
        });
 











        /**
         * 
         

        for(i = 1; i <= studentData.length; i++){
            buf = new Buffer(studentData[i-1].qrCodeLink.split(',')[1],'base64')
            
            var imageData = {
                Key: ''+i, 
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: 'image/png',
                ACL:'public-read-write'
            };
           
             
            await s3Bucket.upload(imageData, function(err, uploadedInfo) {
                if (err) {
                    console.log('error in callback');
                    console.log(err);
                }
                console.log('success');
                console.log(i);
                console.log(uploadedInfo); 
            });



    
        
        }
        */
    }
}



/**
 * 
 * 
 * async generateCodes(data) {

        for(i = 0; i < data.length; i++){
            let data64 = await QRCode.toDataURL(''+data[i].id);

            data[i]['qrCodeLink'] = data64// qr code;
        }
        
        return data;
    },
 * 
 * 
 * 
 * 
 * 
 * return new Promise(async (resolve, reject) => {

            for ( x in data ){
                let data64 = await QRCode.toDataURL(''+value.id);
                value['qrCodeLink'] = data64// qr code;
            }

            console.log(data);
            resolve(data);
        })
 */