<script lang="ts">
import { fill_board_with_numbers } from '$lib/initialise';
import type { Tile } from '$lib/types';


// create a 2D array 9x9 for sudoku
let board: Tile[][] = Array(9).fill(0).map(() => Array(9).fill({ value: 0, visible: false }));
fill_board_with_numbers(board);
console.log(board)
</script>

<h1>
    FUCKSUDOKU.COM
</h1>

<p>
    A free sudoku site FOR anyone who wants to play sudoku FOR FREE and is tired of HAVING TO WATCH AD FOR TRASH SCAM GAMES.
</p>

<div class="board">
    {#each board as row}
        {#each row as tile}
            <div class="tile">
                {#if tile.is_revealed}
                    {tile.value}
                {/if}
            </div>
        {/each}
    {/each}
</div>

<style>
.board {
    padding: 100px;
    width: 900px;
    height: 900px;
}

.tile {
    height: 100px;
    width: 100px;
    border: 2px solid black;
}
</style>