

// if the number is valid for the row
// if the number is valid for the column

import type { Tile } from './types'

// if the number is valid for the square
export function is_valid_tile_for_number(board: Tile[][], row_i: number, column_i: number, number: number) {
    return is_valid_for_row(board, row_i, number) &&
        is_valid_for_column(board, column_i, number) &&
        is_valid_for_square(board, row_i, column_i, number);
}


export function is_valid_for_row(board: Tile[][], row_i: number, number: number) {
    // if the number is in the row, it's not valid
    for (let i = 0; i < board[row_i].length; i++) {
        if (board[row_i][i].value === number) {
            return false;
        }
    }
    // otherwise it is valid
    return true;
}

export function is_valid_for_column(board: Tile[][], column_i: number, number: number) {
    // if the number is in the column, it's not valid
    for (let i = 0; i < board.length; i++) {
        if (board[i][column_i].value === number) {
            return false;
        }
    }
    // otherwise it is valid
    return true;
}

export function is_valid_for_square(board: Tile[][], row_index: number, column_index: number, number: number) {
    // let square_row_start = Math.floor(row_index / 3) * 3;
    // let square_column_start = Math.floor(column_index / 3) * 3;

    // // if the number is in the square, it's not valid
    // for (let i = square_row_start; i < square_row_start + 3; i++) {
    //     for (let j = square_column_start; j < square_column_start + 3; j++) {
    //         if (board[i][j].value === number) {
    //             return false;
    //         }
    //     }
    // }
    // // otherwise it is valid
    return true;
}