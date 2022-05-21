class SudokuSolver {

    validate(puzzleString) {

        return puzzleString.length == 81 && !puzzleString.match(/[^\.\d]/g);

    }

    checkRowPlacement(puzzleString, row, column, value) {



    }

    checkColPlacement(puzzleString, row, column, value) {



    }

    checkRegionPlacement(puzzleString, row, column, value) {

        

    }

    solve(puzzleString) {

    }
}

module.exports = SudokuSolver;