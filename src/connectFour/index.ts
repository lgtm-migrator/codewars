/*
https://www.codewars.com/kata/586c0909c1923fdb89002031

The game consists of a grid (7 columns and 6 rows) and two players that take turns to drop their discs.
The pieces fall straight down, occupying the next available space within the column.
The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs.

Your task is to create a Class called Connect4 that has a method called play which takes one argument
for the column where the player is going to place their disc.

Rules
    If a player successfully has 4 discs horizontally, vertically or diagonally then you should
        return "Player n wins!” where n is the current player either 1 or 2.
    If a player attempts to place a disc in a column that is full then you should
        return ”Column full!” and the next move must be taken by the same player.
    If the game has been won by a player, any following moves should return ”Game has finished!”.
    Any other move should return ”Player n has a turn” where n is the current player either 1 or 2.
    Player 1 starts the game every time and alternates with player 2.
    The columns are numbered 0-6 left to right.
*/

export class Connect4 {
    private grid: (0 | 1 | 2)[][];

    private currentPlayer: 1 | 2 = 2;

    private changePlayer() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }

    private currentPlayerHasATurn() {
        return `Player ${this.currentPlayer} has a turn`;
    }

    private currentPlayerHasWon() {
        return `Player ${this.currentPlayer} wins!`;
    }

    private gameIsFinished = false;

    constructor(rows = 6, columns = 7) {
        this.grid = new Array(rows)
            .fill(0)
            .map(() => new Array(columns).fill(0));
    }

    play(col: number): string {
        if (this.gameIsFinished) {
            return 'Game has finished!';
        }

        this.changePlayer();

        if (this.checkColumnFull(col)) {
            this.changePlayer();

            return 'Column full!';
        }

        for (let row = this.grid.length - 1; row >= 0; row--) {
            if (this.grid[row][col] === 0) {
                this.grid[row][col] = this.currentPlayer;
                break;
            }
        }

        if (this.checkWin(col)) {
            this.gameIsFinished = true;

            return this.currentPlayerHasWon();
        }

        return this.currentPlayerHasATurn();
    }

    private checkColumnFull(col: number) {
        return this.grid[0][col] !== 0;
    }

    private checkVerticalWin(column: number) {
        const currentColumn = this.grid.map((row) => row[column]);

        const currentColumnCount = this.count4InARow(currentColumn);

        const win = currentColumnCount === 4;
        if (win) {
            console.log('vertical win');
        }

        return win;
    }

    private checkHorizontalWin() {
        const rowWins = this.grid.map((row) => this.count4InARow(row));

        const win = rowWins.some((rowWin) => rowWin === 4);
        if (win) {
            console.log('horizontal win');
        }

        return win;
    }

    private checkDiagonalWin() {
        const diagonals = [
            ...this.getDiagonals(true),
            ...this.getDiagonals(false),
        ].filter((diagonal) => diagonal.length >= 4);

        const diagonalWins = diagonals.map((diagonal) =>
            this.count4InARow(diagonal),
        );

        const win = diagonalWins.some((diagonalWin) => diagonalWin === 4);
        if (win) {
            console.log('diagonal win');
        }

        return win;
    }

    private getDiagonals(bottomToTop: boolean) {
        const YLength = this.grid.length;
        const XLength = this.grid[0].length;
        const maxLength = Math.max(XLength, YLength);
        let temp;
        const returnArray = [];
        for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
            temp = [];
            for (let y = YLength - 1; y >= 0; --y) {
                const x = k - (bottomToTop ? YLength - y : y);
                if (x >= 0 && x < XLength) {
                    temp.push(this.grid[y][x]);
                }
            }
            if (temp.length > 0) {
                returnArray.push(temp);
            }
        }

        return returnArray;
    }

    private spaceBelongsToCurrentPlayer(val: number) {
        return val === this.currentPlayer;
    }

    private beforeAndAfterBelongToCurrentPlayer(index: number, arr: number[]) {
        const before = arr[index - 1]
            ? this.spaceBelongsToCurrentPlayer(arr[index - 1])
            : true;
        const after = arr[index + 1]
            ? this.spaceBelongsToCurrentPlayer(arr[index + 1])
            : true;

        return before && after;
    }

    private count4InARow(array: number[]) {
        return array.reduce<number>((acc, val, index, arr) => {
            if (
                this.spaceBelongsToCurrentPlayer(val) &&
                this.beforeAndAfterBelongToCurrentPlayer(index, arr)
            ) {
                return acc + 1;
            }

            return acc;
        }, 0);
    }

    private checkWin(column: number) {
        return (
            this.checkVerticalWin(column) ||
            this.checkHorizontalWin() ||
            this.checkDiagonalWin()
        );
    }
}
