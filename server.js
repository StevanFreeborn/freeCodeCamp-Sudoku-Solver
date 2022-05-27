require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai').expect;
const cors = require('cors');

const fccTestingRoutes = require('./routes/fcctesting.js');
const apiRoutes = require('./routes/api.js');
const runner = require('./test-runner');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use(cors({ origin: '*' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/').get((req, res) => {

    res.sendFile(process.cwd() + '/views/index.html');
    
});

apiRoutes(app);
fccTestingRoutes(app);

//404 Not Found Middleware
app.use((req, res, next) => {

    res.status(404)
        .type('text')
        .send('Not Found');

});


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {

    console.log("Listening on port " + PORT);

    if (process.env.NODE_ENV === 'test') {

        console.log('Running Tests...');

        setTimeout(() => {

            try {

                runner.run();

            } catch (error) {

                console.log('Tests are not valid:');
                console.error(error);

            }

        }, 3500);
    }

});

module.exports = app; // for testing