import type { Tile } from './types'

// Create a 9x9 board filled with empty Tiles
// Create a 9x9 board filled with empty Tiles
export function createBoard(): Tile[][] {
    let board: Tile[][] = [];
    let attempts = 0;
    const maxAttempts = 5; // Specify the maximum number of attempts here

    // A helper function to initialize the board with empty tiles
    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            board[i] = [];
            for (let j = 0; j < 9; j++) {
                board[i][j] = { value: 0, is_revealed: false };
            }
        }
    }

    // Try to generate a valid Sudoku board, retrying up to maxAttempts times
    while (attempts < maxAttempts) {
        initializeBoard();
        if (generateSudoku(board)) {
            // If a valid board was generated, return it
            if (attempts > 0) {
                console.log(`Sudoku board generated after ${attempts} ${attempts === 1 ? 'retry' : 'retries'}.`);
            }
            return board;
        }
        attempts++;
    }

    throw new Error(`Failed to generate a valid Sudoku board after ${maxAttempts} attempts`);
}

// Check if a number can be placed at a specific position on the board
function isValid(board: Tile[][], row: number, col: number, num: number): boolean {
    // Check the number in the row
    for (var i = 0; i < 9; i++) {
        if (board[row][i].value == num) {
            return false;
        }
    }

    // Check the number in the column
    for (var i = 0; i < 9; i++) {
        if (board[i][col].value == num) {
            return false;
        }
    }

    // Check the number in the box
    var startRow = row - row % 3;
    var startCol = col - col % 3;

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol].value == num) {
                return false;
            }
        }
    }

    // If the number is not found in the row, column or box, it's valid
    return true;
}

// Generate a Sudoku puzzle using backtracking
function generateSudoku(board: Tile[][]): boolean {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j].value == 0) { // If the current Tile is empty
                for (var num = 1; num <= 9; num++) { // Try numbers from 1 to 9
                    if (isValid(board, i, j, num)) {
                        board[i][j].value = num; // Place the number on the Tile

                        // Recursive call to fill the next cell
                        if (generateSudoku(board)) {
                            return true; // Continue to check if the rest of the board can be filled
                        }

                        board[i][j].value = 0; // Reset the cell as the number placement did not lead to a solution
                    }
                }

                // If no number can be placed in this cell, return false to backtrack
                return false;
            }
        }
    }

    // Only return true if the entire board is filled correctly
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j].value == 0) {
                return false; // If any cell is still 0, then the board is not filled correctly
            }
        }
    }

    return true;
}

export function revealTiles(board: Tile[][], numberOfTilesToReveal: number): void {
    let revealedCount = 0;
    const totalTiles = 9 * 9; // Total number of tiles on the board

    // Helper function to get a random integer within a range
    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Continue revealing tiles until the desired number is reached
    while (revealedCount < numberOfTilesToReveal) {
        let row = getRandomInt(0, 8);
        let col = getRandomInt(0, 8);

        // If the tile is not already revealed, reveal it
        if (!board[row][col].is_revealed) {
            board[row][col].is_revealed = true;
            revealedCount++;

            // Check if we've reached the maximum number of tiles that can be revealed
            if (revealedCount === totalTiles) {
                break;
            }
        }
    }
}