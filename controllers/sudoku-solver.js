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

        // make sure placement location doesn't contain a value or contains same value
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

        let offset = 0;

        columnKeys.forEach(() => {

            columnKeys.forEach((key, index) => {

                const start = index + (9 * offset)
                const end = start + 1;
                
                const columnValue = puzzleString.slice(start, end);
                
                columns[key].push(columnValue);
    
            });

            offset += 1;
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

        // make sure placement location doesn't contain a value or contains same value
        // make sure placements row does not already have value.
        return (existingValue == '.' || existingValue == value) && !columnValues.includes(value);

    }

    checkRegionPlacement(puzzleString, row, column, value) {



    }

    solve(puzzleString) {

    }
}

module.exports = SudokuSolver;