var sudokuApp = new Vue({
    el: '#sudoku-app',
    data: {
        sudokuMatrix: [],
        initializeGameText: "start",
        evaluateGameText: "verify",
        answerImage: "",
        isGameStarted: false,
        showAnswer: false,
    },
    methods: {
        initializeGame() {
            var defaultSudokuMatrix = [
                [{ num: 5 }, { num: 3 }, { num: 4 }, { num: 6 }, { num: 7 }, { num: 8 }, { num: 9 }, { num: 1 }, { num: 2 }],
                [{ num: 6 }, { num: 7 }, { num: 2 }, { num: 1 }, { num: 9 }, { num: 5 }, { num: 3 }, { num: 4 }, { num: 8 }],
                [{ num: 1 }, { num: 9 }, { num: 8 }, { num: 3 }, { num: 4 }, { num: 2 }, { num: 5 }, { num: 6 }, { num: 7 }],
                [{ num: 8 }, { num: 5 }, { num: 9 }, { num: 7 }, { num: 6 }, { num: 1 }, { num: 4 }, { num: 2 }, { num: 3 }],
                [{ num: 4 }, { num: 2 }, { num: 6 }, { num: 8 }, { num: 5 }, { num: 3 }, { num: 7 }, { num: 9 }, { num: 1 }],
                [{ num: 7 }, { num: 1 }, { num: 3 }, { num: 9 }, { num: 2 }, { num: 4 }, { num: 8 }, { num: 5 }, { num: 6 }],
                [{ num: 9 }, { num: 6 }, { num: 1 }, { num: 5 }, { num: 3 }, { num: 7 }, { num: 2 }, { num: 8 }, { num: 4 }],
                [{ num: 2 }, { num: 8 }, { num: 7 }, { num: 4 }, { num: 1 }, { num: 9 }, { num: 6 }, { num: 3 }, { num: 5 }],
                [{ num: 3 }, { num: 4 }, { num: 5 }, { num: 2 }, { num: 8 }, { num: 6 }, { num: 1 }, { num: 7 }, { num: 9 }]
            ];

            // empty randomly two cells from each line
            for (var i = 0; i < 9; ++i) {
                for (var k = 0; k < 9; ++k) {
                    var randomColumnIndex = Math.floor(Math.random() * defaultSudokuMatrix.length);
                    defaultSudokuMatrix[i][randomColumnIndex].num = "";
                }
            }

            this.sudokuMatrix = defaultSudokuMatrix;
            this.initializeGameText = "try again";
            this.isGameStarted = true;
        },

        evaluateGame() {
            var copyOfSudokuMatrix = [];
            for (var i = 0; i < this.sudokuMatrix.length; i++) {
                if (!copyOfSudokuMatrix[i]) {
                    copyOfSudokuMatrix[i] = [];
                }
                for (var k = 0; k < this.sudokuMatrix[i].length; k++) {
                    copyOfSudokuMatrix[i][k] = this.sudokuMatrix[i][k].num;
                }
            }

            var sudokuSolver = Sudoku.init(copyOfSudokuMatrix);

            if (sudokuSolver.isValid()) {
                this.answerImage = "success.gif";
                this.showAnswer = true;
                this.isGameStarted = false;
                setTimeout(() => {
                    this.showAnswer = false;
                    this.isGameStarted = true;
                }, 2000)
            } else {
                this.answerImage = "fail.gif";
                this.showAnswer = false;
                this.isGameStarted = false;
                setTimeout(() => {
                    this.showAnswer = false;
                    this.isGameStarted = true;
                }, 2000)
            }
        }
    }

})
