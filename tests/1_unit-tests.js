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



});