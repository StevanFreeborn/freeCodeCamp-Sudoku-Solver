class SudokuSolver {

    validate(puzzleString) {

        return puzzleString.length == 81 && !puzzleString.match(/[^\.\d]/g);

    }

    checkRowPlacement(puzzleString, row, column, value) {

        // rows
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

        // make sure placement location does not already contain a number
        // make sure placements row does not already have value.
        return (existingValue == '.' || existingValue == value) && !rowValues.includes(value);

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

        columnKeys.forEach((key, index) => {

            

        });

    }

    checkRegionPlacement(puzzleString, row, column, value) {



    }

    solve(puzzleString) {

    }
}

module.exports = SudokuSolver;