require('dotenv').config()

const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();

const publicVapidKey = process.env.PUBLICKEY
const privateVapidKey = process.env.PRIVATEKEY

app.use(express.static(path.join(__dirname, 'client')))

app.use(bodyParser.json());


webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)


// Subscribe Route

app.post('/subscribe', (req, res) => {


    setTimeout(() => {
        // Get pushSubcription object
        const subscription = req.body;

        console.log('BODY' + subscription)
        // send 201 - resource created
        res.status(201).json({});

        // Create payload
        const payload = JSON.stringify({
            title: 'Thông báo'
        })

        // Pass object into sendNotification
        webpush.sendNotification(subscription, payload).catch(err => console.error(err))
    }, 5000);

})


const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))


// console.log(publicVapidKey)
// console.log(privateVapidKey)