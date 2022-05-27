'use strict';

const SudokuSolver = require('../controllers/sudoku-solver');
import { columns } from '../models/columns';
import { rows } from '../models/rows';

module.exports = function (app) {

    let solver = new SudokuSolver();

    app.route('/api/check')
        .post((req, res) => {

            // get puzzle string, coordinate, and value
            // from request
            const puzzleString = req.body.puzzle;
            const coordinate = req.body.coordinate;
            const value = req.body.value;

            // if any of the three are not in request return error
            if (puzzleString == undefined || coordinate == undefined || value == undefined) return res.status(200).json({error: 'Required field(s) missing'});

            // attempt to validate puzzle
            const validate = solver.validate(puzzleString);

            // if puzzle invalid return error
            if (validate != true) return res.status(200).json({error: validate});
            
            // get row and col from coordinate value
            const row = coordinate.slice(0,1)
            const col = coordinate.slice(1, coordinate.length);

            // get the valid rows and cols
            const validRows = Object.keys(rows);
            const validColumns = Object.keys(columns);

            // if the passed row or col value are not valid return error.
            if (!validRows.includes(row) || !validColumns.includes(col)) return res.status(200).json({error: 'Invalid coordinate'});

            // if the value passed is NaN or less than 1 or greater than 9 return error.
            if (parseInt(value) < 1 || parseInt(value) > 9 || isNaN(parseInt(value))) return res.status(200).json({error: 'Invalid value'});

            // default response
            const resObj = {
                valid: true
            };

            // check if value can be placed in row, col, and grid according to pass coordinate
            const validRow = solver.checkRowPlacement(puzzleString, row, col, value);
            const validCol = solver.checkColPlacement(puzzleString, row, col, value);
            const validGrid = solver.checkRegionPlacement(puzzleString, row, col, value);

            // if any conflicts build response
            // build response indicating invalid placement
            // and conflicts causing invalid placement
            if (!validRow || !validCol || !validGrid) {

                resObj.valid = false;
                resObj.conflict = [];

                if (!validRow) resObj.conflict.push('row');
                if (!validCol) resObj.conflict.push('column');
                if (!validGrid) resObj.conflict.push('grid');

                return res.status(200).json(resObj);
            }

            // if all previous checks pass return default valid response.
            return res.status(200).json(resObj);
        });

    app.route('/api/solve')
        .post((req, res) => {

            // get puzzle string from request
            const puzzleString = req.body.puzzle;

            // if no puzzle string in request
            // return error
            if (puzzleString == undefined) return res.status(200).json({error: 'Required field missing' });

            // attempt to validate puzzle
            const validate = solver.validate(puzzleString);

            // if puzzle string invalid return error
            if (validate != true) return res.status(200).json({error: validate});

            // attempt to solve puzzle
            const solution = solver.solve(puzzleString);
            
            // if puzzle can't be solved return error
            if (solution == false) return res.status(200).json({error: 'Puzzle cannot be solved'});

            // otherwise return solution
            return res.status(200).json({solution: solution});

        });
};