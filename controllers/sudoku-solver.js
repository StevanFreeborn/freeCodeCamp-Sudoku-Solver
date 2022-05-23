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

        columnKeys.forEach((n, i) => {

            columnKeys.forEach((key, j) => {

                const start = j + (9 * i)
                const end = start + 1;
                
                const columnValue = puzzleString.slice(start, end);
                
                columns[key].push(columnValue);
    
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

        // make sure placement location doesn't contain a value or contains same value
        // make sure placements row does not already have value.
        return (existingValue == '.' || existingValue == value) && !columnValues.includes(value);

    }

    checkRegionPlacement(puzzleString, row, column, value) {

        const location = row + column;

        let grids = {
            gridOne: {
                locations: ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'],
                values: []
            },
            gridTwo: {
                locations: ['A4', 'A5', 'A6', 'B4', 'B5', 'B6', 'C4', 'C5', 'C6'],
                values: []
            },
            gridThree: {
                locations: ['A7', 'A8', 'A9', 'B7', 'B8', 'B9', 'C7', 'C8', 'C9'],
                values: []
            },
            gridFour: {
                locations: ['D1', 'D2', 'D3', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3'],
                values: []
            },
            gridFive: {
                locations: ['D4', 'D5', 'D6', 'E4', 'E5', 'E6', 'F4', 'F5', 'F6'],
                values: []
            },
            gridSix: {
                locations: ['D7', 'D8', 'D9', 'E7', 'E8', 'E9', 'F7', 'F8', 'F9'],
                values: []
            },
            gridSeven: {
                locations: ['G1', 'G2', 'G3', 'H1', 'H2', 'H3', 'I1', 'I2', 'I3'],
                values: []
            },
            gridEight: {
                locations: ['G4', 'G5', 'G6', 'H4', 'H5', 'H6', 'I4', 'I5', 'I6'],
                values: []
            },
            gridNine: {
                locations: ['G7', 'G8', 'G9', 'H7', 'H8', 'H9', 'I7', 'I8', 'I9'],
                values: []
            }
        };

        const gridKeys = Object.keys(grids);

        gridKeys.forEach((key, i) => {

            let offset = 0;

            if (i >= 3 && i <= 5) {

                offset += 2;

            }

            if (i >= 6 && i <= 8) {

                offset += 4;

            }

            for (let j = 0; j < 3; j++) {

                const start = (i * 3) + (9 * (j + offset));
                const end = start + 3;
                const gridValues = puzzleString.slice(start, end).split('');

                grids[key].values = grids[key].values.concat(gridValues);

            }
    
        });

        let gridValues = [];

        gridKeys.forEach(key => {

            const grid = grids[key]

            if (grid.locations.includes(location)) {
                gridValues = gridValues.concat(grid.values);
            }

        });

        let existingValue;

        switch (row) {
            case 'A':
            case 'D':
            case 'H':
                existingValue = gridValues[(parseInt(column) - 1)];
                break;
            case 'B':
            case 'E':
            case 'H':
                existingValue = gridValues[3 + (parseInt(column) - 1)];
                break;
            case 'C':
            case 'F':
            case 'I':
                existingValue = gridValues[6 + (parseInt(column) - 1)];
                break;
            default:
                break;
        }

        return (existingValue == '.' || existingValue == value) && !gridValues.includes(value);

    }

    solve(puzzleString) {

    }
}

module.exports = SudokuSolver;