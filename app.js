const express = require('express')
const bodyParser = require('body-parser')
const https = require('https');
//const request = require('request');
const app = express()
const port = 3000
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/sign-up.html');
       
    });
    app.post('/', function (req, res) {
        const firstName = req.body.fName;
        const lastName = req.body.lName;
        const email = req.body.email;
        const data = {
members: [
    {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
        }
    }
]

        };
        const jsonData = JSON.stringify(data);
        const url = 'https://us21.api.mailchimp.com/3.0/lists/34a0225d86'
        const options = {
            method: 'post',
            auth: 'jossymono:b0c5b932bd73a2f7b15ad70ff37fb187-us21'
        }
const request = https.request(url, options, function (response) {
if (response.statusCode === 200) {
    res.sendFile(__dirname + '/success.html');
} else {
    res.sendFile(__dirname + '/failure.html');
}

   

    response.on('data', function (data) {
        console.log(JSON.parse(data))
    })
} )
   request.write(jsonData)
   request.end();     
    });


    app.post('/failure', function (req,res) {
        res.redirect('/');
    })
app.listen(port|| process.env.PORT, () => {
  console.log(` Newsletter App listening on port ${port}`)
})
