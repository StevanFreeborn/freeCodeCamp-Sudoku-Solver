'use strict';

const SudokuSolver = require('../controllers/sudoku-solver');

module.exports = function (app) {

    let solver = new SudokuSolver();

    app.route('/api/check')
        .post((req, res) => {

        });

    app.route('/api/solve')
        .post((req, res) => {

            const puzzleString = req.body.puzzle;

            if (puzzleString == undefined) return res.status(200).json({error: 'Required field missing' });

            const validate = solver.validate(puzzleString);

            if (validate != true) return res.status(200).json({error: validate});

            const solution = solver.solve(puzzleString);
            
            if (solution == false) return res.status(200).json({error: 'Puzzle cannot be solved'});

            return res.status(200).json({solution: solution});

        });
};