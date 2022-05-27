const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    test('POST /api/solve Solve a puzzle with valid puzzle string', (done) => {

        const puzzleString = puzzlesAndSolutions[0][0];
        const solution = puzzlesAndSolutions[0][1];

        chai.request(server)
        .post('/api/solve')
        .set('content-type', 'application/x-www-urlencoded')
        .type('form')
        .send(`puzzle=${puzzleString}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.propertyVal(res.body, 'solution', solution);
            
            done();

        });

    });

    test('POST /api/solve Solve a puzzle with missing puzzle string', (done) => {

        chai.request(server)
        .post('/api/solve')
        .set('content-type', 'application/x-www-urlencoded')
        .type('form')
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.propertyVal(res.body, 'error', 'Required field missing');
            
            done();

        });

    });

    test('POST /api/solve Solve a puzzle with invalid characters', (done) => {

        const puzzleString = puzzlesAndSolutions[0][0].slice(0,80) + '?';

        chai.request(server)
        .post('/api/solve')
        .set('content-type', 'application/x-www-urlencoded')
        .type('form')
        .send(`puzzle=${puzzleString}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.propertyVal(res.body, 'error', 'Invalid characters in puzzle');
            
            done();

        });

    });

    test('POST /api/solve Solve a puzzle with incorrect length', (done) => {

        const puzzleString = puzzlesAndSolutions[0][0] + '.';

        chai.request(server)
        .post('/api/solve')
        .set('content-type', 'application/x-www-urlencoded')
        .type('form')
        .send(`puzzle=${puzzleString}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.propertyVal(res.body, 'error', 'Expected puzzle to be 81 characters long');
            
            done();

        });

    });

    test('POST /api/solve Solve a puzzle that cannot be solved', (done) => {

        const puzzleString = puzzlesAndSolutions[5][0]

        chai.request(server)
        .post('/api/solve')
        .set('content-type', 'application/x-www-urlencoded')
        .type('form')
        .send(`puzzle=${puzzleString}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.propertyVal(res.body, 'error', 'Puzzle cannot be solved');
            
            done();

        });

    });

    test('POST /api/check Check a puzzle placement with all fields', (done) => {

        const puzzleString = puzzlesAndSolutions[0][0];
        const coordinate = 'A2';
        const value = '3';

        chai.request(server)
        .post('/api/check')
        .set('content-type', 'application/x-www-urlencoded')
        .type('form')
        .send(`puzzle=${puzzleString}`)
        .send(`coordinate=${coordinate}`)
        .send(`value=${value}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.propertyVal(res.body, 'valid', true);
            
            done();

        });


    });

    test('POST /api/check Check a puzzle placement with single placement conflict', (done) => {

        const puzzleString = puzzlesAndSolutions[0][0];
        const coordinate = 'A2';
        const value = '4';

        chai.request(server)
        .post('/api/check')
        .set('content-type', 'application/x-www-urlencoded')
        .type('form')
        .send(`puzzle=${puzzleString}`)
        .send(`coordinate=${coordinate}`)
        .send(`value=${value}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.propertyVal(res.body, 'valid', false);
            assert.property(res.body, 'conflict');
            assert.isArray(res.body.conflict);
            assert.equal(res.body.conflict.length, 1);
            assert.equal(res.body.conflict[0], 'row');
            
            done();

        });

    });

    test('POST /api/check Check a puzzle placement with multiple placement conflicts', (done) => {

        const puzzleString = puzzlesAndSolutions[0][0];
        const coordinate = 'A2';
        const value = '5';

        chai.request(server)
        .post('/api/check')
        .set('content-type', 'application/x-www-urlencoded')
        .type('form')
        .send(`puzzle=${puzzleString}`)
        .send(`coordinate=${coordinate}`)
        .send(`value=${value}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.propertyVal(res.body, 'valid', false);
            assert.property(res.body, 'conflict');
            assert.isArray(res.body.conflict);
            assert.equal(res.body.conflict.length, 2);
            assert.equal(res.body.conflict[0], 'row');
            assert.equal(res.body.conflict[1], 'grid');
            
            done();

        });

    });

    test('POST /api/check Check a puzzle placement with all placement conflicts', (done) => {

        const puzzleString = puzzlesAndSolutions[0][0];
        const coordinate = 'A2';
        const value = '2';

        chai.request(server)
        .post('/api/check')
        .set('content-type', 'application/x-www-urlencoded')
        .type('form')
        .send(`puzzle=${puzzleString}`)
        .send(`coordinate=${coordinate}`)
        .send(`value=${value}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.propertyVal(res.body, 'valid', false);
            assert.property(res.body, 'conflict');
            assert.isArray(res.body.conflict);
            assert.equal(res.body.conflict.length, 3);
            assert.equal(res.body.conflict[0], 'row');
            assert.equal(res.body.conflict[1], 'column');
            assert.equal(res.body.conflict[2], 'grid');

            done();

        });

    });

    test('POST /api/check Check a puzzle placement with missing required fields', (done) => {

        chai.request(server)
        .post('/api/check')
        .set('content-type', 'application/x-www-urlencoded')
        .type('form')
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.propertyVal(res.body, 'error', 'Required field(s) missing');

            done();

        });

    });

    test('POST /api/check Check a puzzle placement with invalid characters', (done) => {

        const puzzleString = puzzlesAndSolutions[0][0].slice(0,80) + '?';
        const coordinate = 'A2';
        const value = '2';

        chai.request(server)
        .post('/api/check')
        .set('content-type', 'application/x-www-urlencoded')
        .type('form')
        .send(`puzzle=${puzzleString}`)
        .send(`coordinate=${coordinate}`)
        .send(`value=${value}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.propertyVal(res.body, 'error', 'Invalid characters in puzzle');

            done();

        });

    });

    test('POST /api/check Check a puzzle placement with incorrect length', (done) => {

        const puzzleString = puzzlesAndSolutions[0][0] + '.';
        const coordinate = 'A2';
        const value = '2';

        chai.request(server)
        .post('/api/check')
        .set('content-type', 'application/x-www-urlencoded')
        .type('form')
        .send(`puzzle=${puzzleString}`)
        .send(`coordinate=${coordinate}`)
        .send(`value=${value}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.propertyVal(res.body, 'error', 'Expected puzzle to be 81 characters long');

            done();

        });

    });

    test('POST /api/check Check a puzzle placement with invalid placement coordinate', (done) => {

        const puzzleString = puzzlesAndSolutions[0][0];
        const coordinate = 'A10';
        const value = '2';

        chai.request(server)
        .post('/api/check')
        .set('content-type', 'application/x-www-urlencoded')
        .type('form')
        .send(`puzzle=${puzzleString}`)
        .send(`coordinate=${coordinate}`)
        .send(`value=${value}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.propertyVal(res.body, 'error', 'Invalid coordinate');

            done();

        });

    });

    test('POST /api/check Check a puzzle placement with invalid placement value', (done) => {

        const puzzleString = puzzlesAndSolutions[0][0];
        const coordinate = 'A2';
        const value = '0';

        chai.request(server)
        .post('/api/check')
        .set('content-type', 'application/x-www-urlencoded')
        .type('form')
        .send(`puzzle=${puzzleString}`)
        .send(`coordinate=${coordinate}`)
        .send(`value=${value}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.propertyVal(res.body, 'error', 'Invalid value');

            done();

        });

    });

});