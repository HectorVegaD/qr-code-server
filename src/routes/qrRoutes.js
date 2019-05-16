const express = require('express');
const router = express.Router();

const qrCodeGenerator = require('../_services/helpers/qrGenerator.pipe');


router.post('/generate-qr-codes', async (req, res, next) => {
    qrCodeGenerator.generateLinks();
});

router.post('/send-qr-codes', async (req, res, next) => {
    // get applicant data from database:
    let data = [
        {id: 1, phone: '+17143603237'},
        {id: 2, phone: '+13233975154'}
    ]

    for (i = 0; i < data.length; i++){
        let link = 'https://orientation-qr-codes.s3.us-west-1.amazonaws.com/'+data[i].id;
        console.log(data[i].phone);
        qrCodeGenerator.sendText(link, data[i].phone);

        await qrCodeGenerator.sleep(2000);
    }
});


module.exports = router;













/**
 * twilioClient.messages.create({
        body: 'hi',
        from: '+16573065608',
        to: '+17143603237',
    })
    .then(message => {
        console.log(message.sid);
        console.log('hi');
        res.send('finished');
    });
 */





   /**
     * 
     
    async.eachSeries(data, function(keyValue, cb) {
        let link = 'https://orientation-qr-codes.s3.us-west-1.amazonaws.com/'+keyValue.id;

        twilioClient.messages.create({
            body: 'hi',
            from: '+16573065608',
            to: keyValue.phone,
            mediaUrl: link
        }, function(message) {
            console.log(message);
            cb();
            /**
             * 
             
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
       

        /**
        .then(message => {
            console.log(message.sid);
            console.log('hi');
            cb();
        }); 
    }, function(err, results) {
        if (err) console.log('one of the uploads failed')
        else {
            console.log('all files uploaded');
        }
    });

*/



    /**
     * 
    

    for (i = 0; i < data.length; i++){
        let link = 'https://orientation-qr-codes.s3.us-west-1.amazonaws.com/'+data[i].id;
        console.log(data[i].phone);
        await twilioClient.messages.create({
            body: 'hi',
            from: '+16573065608',
            to: data[i].phone,
            mediaUrl: link
        })
        .then(message => {
            console.log(message.sid);
            console.log('hi');
        });
        
    }
     */