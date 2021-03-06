import { grids } from '../models/grids';

class SudokuSolver {

    validate(puzzleString) {

        if (puzzleString.length != 81) return 'Expected puzzle to be 81 characters long';

        if (puzzleString.match(/[^\.\d]/g)) return 'Invalid characters in puzzle';

        return true;

    }

    checkRowPlacement(puzzleString, row, column, value) {

        const rows = {
            A: [],
            B: [],
            C: [],
            D: [],
            E: [],
            F: [],
            G: [],
            H: [],
            I: [],
        };

        // rowKeys
        const rowKeys = Object.keys(rows);

        // split puzzle strings and assign row values for each row
        rowKeys.forEach((key, index) => {

            const start = index * 9;
            const end = start + 9;

            const rowValues = puzzleString.slice(start, end).split('');
            
            rows[key] = rowValues

        });

        // get row values for placement
        const rowValues = rows[row];

        // get existing value placed
        const existingValue = rowValues[column - 1];

        // make sure placement location doesn't contain a value and row doesn't contain value
        // or same value already exists in location
        return (existingValue == '.' && !rowValues.includes(value)) || existingValue == value;

    }

    checkColPlacement(puzzleString, row, column, value) {

        const columns = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
        };

        const columnKeys = Object.keys(columns);
        
        columnKeys.forEach((key, i) => {

            let values = []

            columnKeys.forEach((n, j) => {

                const start = j + (9 * i)
                const end = start + 1;
                
                const columnValue = puzzleString.slice(start, end);

                columns[n].push(columnValue);
            });

        });

        // get column values for placement
        const columnValues = columns[column];

        // get existing value placed
        let existingValue;

        switch (row) {
            case 'A':
                existingValue = columnValues[0];
                break;
            case 'B':
                existingValue = columnValues[1];
                break;
            case 'C':
                existingValue = columnValues[2];
                break;
            case 'D':
                existingValue = columnValues[3];
                break;
            case 'E':
                existingValue = columnValues[4];
                break;
            case 'F':
                existingValue = columnValues[5];
                break;
            case 'G':
                existingValue = columnValues[6];
                break;
            case 'H':
                existingValue = columnValues[7];
                break;
            case 'I':
                existingValue = columnValues[8];
                break;
            default:
                break;
        }
        
        // make sure placement location doesn't contain a value and column doesn't contain value
        // or location already contains value
        return (existingValue == '.' && !columnValues.includes(value)) || existingValue == value;

    }

    checkRegionPlacement(puzzleString, row, column, value) {

        // build location from row and column values
        const location = row + column;

        // get keys for grids object
        const gridKeys = Object.keys(grids);

        // for each grid key loop through
        // and slice values from puzzle string
        // to create each grids corresponding grid values
        gridKeys.forEach((key, i) => {

            let offset = 0;

            if (i >= 3 && i <= 5) {

                offset += 2;

            }

            if (i >= 6 && i <= 8) {

                offset += 4;

            }

            let values = [];

            for (let j = 0; j < 3; j++) {

                const start = (i * 3) + (9 * (j + offset));
                const end = start + 3;
                const gridValues = puzzleString.slice(start, end).split('');

                values = values.concat(gridValues);

            }

            grids[key].values = values;
    
        });

        let gridValues = [];
        let locations;

        // for each grid key loop through grids
        // find grid that has the location that was passed
        // get that grids grid values
        gridKeys.forEach(key => {

            const grid = grids[key]

            if (grid.locations.includes(location)) {
                gridValues = gridValues.concat(grid.values);
                locations = grid.locations;
            }

        });

        // get existing value from grid values based on location passed
        let existingValue = gridValues[locations.indexOf(location)];

        // make sure placement location doesn't contain a value and grid doesn't contain value
        // or location already contains value.
        return (existingValue == '.' && !gridValues.includes(value)) || existingValue == value;

    }

    solve(puzzleString) {

        if (this.validate(puzzleString) != true) return false;

        // create character array
        let puzzle = puzzleString.split('');

        // transform character array into
        // 2-d array with each element representing a row
        // that contains an array of column values
        let createBoard = (puzzleValues) => {

            let board = [[], [], [], [], [], [], [], [], []]
            let row = -1

            for (let i = 0; i < puzzleValues.length; i++) {

                // when you've reached a multiple of 9
                // it means you are at the beginning
                // of a new row so need to increment the
                // board row
                if (i % 9 === 0) {

                    row = row + 1;

                }

                // push the current puzzle value into the
                // correct board rows array
                board[row].push(puzzleValues[i]);
            }

            // return the board
            return board;
        }

        let checkPlacement = (board, row, col, value) => {

            // verify that the value can be
            // placed in the given column
            for (let i = 0; i < 9; i++) {

                if (board[i][col] == value) {

                    return false;

                }
            }

            // verify that the value can be
            // placed in the given row
            for (let j = 0; j < 9; j++) {

                if (board[row][j] == value) {

                    return false;

                }
            }

            let boxTopRow = parseInt(row / 3) * 3;
            let boxLeftColumn = parseInt(col / 3) * 3;

            // verify that the value can be
            // placed in the given grid
            for (let k = boxTopRow; k < boxTopRow + 3; k++) {

                for (let l = boxLeftColumn; l < boxLeftColumn + 3; l++) {

                    if (board[k][l] == value) {

                        return false;

                    }
                }
            }

            return true;

        }

        let solveForGivenCell = (board, row, col) => {
            
            // reset column and increment
            // row when end of row reached
            if (col === 9) {

                col = 0;
                row++;

            }

            // return solved board
            // when completed all rows
            if (row === 9) {

                return board;

            }

            // if cell is already filled move to
            // next cell
            if (board[row][col] != '.') {

                return solveForGivenCell(board, row, col + 1);

            }

            // attempt to place values 1 - 9 in given
            // cell and if a value can be placed
            // perform a recursive call to check the rest
            // of the cells can be completed without issue.
            for (let i = 1; i < 10; i++) {

                let valueToPlace = i.toString();

                if (checkPlacement(board, row, col, valueToPlace)) {

                    board[row][col] = valueToPlace;

                    if (solveForGivenCell(board, row, col + 1) != false) {

                        return board;

                    }
                    else {

                        board[row][col] = '.';

                    }
                }
            }

            return false;

        }

        // get the solution for the given puzzle
        let board = createBoard(puzzle);
        let solution = solveForGivenCell(board, 0, 0);
        
        if (solution == false) return false;
        return solution.flat().join('');

    }
}

module.exports = SudokuSolver;