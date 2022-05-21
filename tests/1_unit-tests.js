const chai = require('chai');
const assert = chai.assert;

const { puzzlesAndSolutions } = require('../controllers/puzzle-strings');
const Solver = require('../controllers/sudoku-solver');
const solver = new Solver();

suite('UnitTests', () => {

    test('SudokuSolver.validate(puzzleString) valid puzzle string of 81 characters', (done) => {

        const input = puzzlesAndSolutions[0][0];

        assert.equal(solver.validate(input), true);
        done();

    });

    test('SudokuSolver.validate(puzzleString) puzzle string of 81 characters with invalid characters', (done) => {

        const input = puzzlesAndSolutions[0][0].replace(/\./g, '?');

        assert.equal(solver.validate(input), false);
        done();

    });

    test('SudokuSolver.validate(puzzleString) puzzle string of 82 characters with valid characters', (done) => {

        const input = puzzlesAndSolutions[0][0] + '0';

        assert.equal(solver.validate(input), false);
        done();

    });

    test('checkRowPlacement(puzzleString, row, column, value) valid row placement', (done) => {

        const input = puzzlesAndSolutions[0][0];
        const row = 'A';
        const column = '2';
        const value = '9';

        assert.equal(solver.checkRowPlacement(input, row, column, value), true);
        done();

    });

    test('checkRowPlacement(puzzleString, row, column, value) invalid row placement', (done) => {

        const input = puzzlesAndSolutions[0][0];
        const row = 'A';
        const column = '2';
        const value = '8';

        assert.equal(solver.checkRowPlacement(input, row, column, value), false);
        done();

    });

    test('checkColPlacement(puzzleString, row, column, value) valid column placement', (done) => {

        const input = puzzlesAndSolutions[0][0];
        const row = 'A';
        const column = '2';
        const value = '5';

        assert.equal(solver.checkColPlacement(input, row, column, value), true);
        done();

    });

    test('checkColPlacement(puzzleString, row, column, value) invalid column placement', (done) => {

        const input = puzzlesAndSolutions[0][0];
        const row = 'A';
        const column = '2';
        const value = '6';

        assert.equal(solver.checkColPlacement(input, row, column, value), false);
        done();

    });


});