<script lang="ts">
import { createBoard, revealTiles } from '$lib/generate_board';
import type { Tile } from '$lib/types';


// create a 2D array 9x9 for sudoku
let board: Tile[][] = createBoard()
revealTiles(board, 40)

let guess = 1
$: if (guess < 1) guess = 1
$: if (guess > 9) guess = 9

let lives = 3

function select_tile(tile: Tile, row: number, col: number) {
    if (tile.is_revealed) return
    if (tile.value === guess) {
        tile.is_revealed = true
        board = [...board]
    } else {
        alert('wrong')
        lives--
    }

    if (lives === 0) {
        alert('game over')
        board = createBoard()
        revealTiles(board, 40)
        lives = 3
    }
}
</script>

<h1>
    FUCKSUDOKU.COM
</h1>

<p>
    A free sudoku site FOR anyone who wants to play sudoku FOR FREE and is tired of HAVING TO WATCH AD FOR TRASH SCAM GAMES.
</p>

<div class="info_row">
    <div class="info">
        Lives: {lives}
    </div>
</div>

<p>
    Current guess: {guess}
</p>

<div class="info_row">
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as number}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="guess_number" on:click={() => guess = number}>
            {number}
        </div>
    {/each}
</div>

<div class="board">
    {#each board as row, iR}
        <div class="row">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            {#each row as tile, iC}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="tile"
                    class:unrevealed={!tile.is_revealed}
                    class:left_border={iC === 0}
                    class:top_border={iR === 0}
                    class:grid_boundary_row={(iR + 1) % 3 === 0}
                    class:grid_boundary_col={(iC + 1) % 3 === 0}
                    on:click={() => select_tile(tile, iR, iC)}
                >
                    {#if tile.is_revealed}
                        <div class="number">
                            {tile.value}
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    {/each}
</div>


<style>

.info_row {
    display: flex;
    gap: 20px;
}

.guess_number {
    font-size: 30px;
    padding: 10px;
}

.guess_number:hover {
    cursor: pointer;
    background-color: #c4c4c4;
}

.board {
    padding: 100px;
    width: 900px;
    height: 900px;
    display: flex;
    flex-direction: column;
}


.row {
    display: flex;
}

.unrevealed:hover {
    cursor: pointer;
    background-color: #c4c4c4;
}

.tile {
    height: 60px;
    width: 60px;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
}

.tile.grid_boundary_row {
    border-bottom: 4px solid red;
}

.tile.grid_boundary_col {
    border-right: 4px solid red !important;
}

.tile.top_border {
    border-top: 4px solid red;
}

.tile.left_border {
    border-left: 4px solid red;
}

/* Adjust the general tile style to accommodate the thicker border */
.tile {
    height: 58px; /* Adjusted to compensate for the thicker border */
    width: 58px; /* Adjusted to compensate for the thicker border */
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
}

</style>