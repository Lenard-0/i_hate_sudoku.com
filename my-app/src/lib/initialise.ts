import { is_valid_tile_for_number } from './checks';
import type { Tile } from './types'

// we take in the 9x9 board filled with zeros
// we loop through and randomise a number for a square
// then we check if it can go there
// if it can't we try again until we can
export function fill_board_with_numbers(board: Tile[][]) {
    let row_i = 0;
    let column_i = 0;

    while (row_i < 9) {
        while (column_i < 9) {
            let random_number = Math.floor(Math.random() * 9) + 1;
            console.log(random_number)
            // if (is_valid_tile_for_number(board, row_i, column_i, random_number)) {
            //     board[row_i][column_i].value = random_number;
                column_i++;
            // }
        }
        column_i = 0;
        row_i++;
    }
    return board;

}