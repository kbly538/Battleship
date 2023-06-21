/**
 * Factory class for creating different AI players.
 */
export class AIFactory {
    constructor(boardSize = 10) {
        this.boardSize = boardSize
    }

    /**
     * Creates an EasyAI player.
     *
     * @param {number} boardSize - Size of the game board.
     * @returns {EasyAI} An instance of EasyAI.
     */
    getEasy = (boardSize) => new EasyAI(boardSize)

    /**
   * Creates a MediumAI player.
   *
   * @param {number} boardSize - Size of the game board.
   * @returns {MediumAI} An instance of MediumAI.
   */
    getMedium = (boardSize) => new MediumAI(boardSize)
    /**
   * Creates a HardAI player.
   *
   * @param {number} boardSize - Size of the game board.
   * @returns {EasyAI} An instance of EasyAI (temporary placeholder).
   */
    getHard = (boardSize) => new EasyAI(boardSize)
}

/**
 * Base AI class.
 */
class AI {
    constructor() {

    }


    /**
     * Shuffles an array using Fisher-Yates algorithm.
     *
     * @param {any[]} arr - The array to be shuffled.
     */
    static shuffle = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            let j = Math.floor(Math.random() * (i + 1))
            let tmp = arr[i]
            arr[i] = arr[j]
            arr[j] = tmp
        }
    }

}


/**
 * EasyAI class extending AI.
 */
class EasyAI extends AI {
    constructor() {
        super()
        this.cells = []

        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                this.cells.push([row, col])
            }
        }

        AI.shuffle(this.cells)
    }
    /**
     * Attacks a target cell.
     *
     * @returns {number[]} The coordinates of the target cell [row, col].
     * @throws {Error} If there are no remaining cells.
     */
    attackTarget = () => {
        if (this.cells.length === 0) {
            throw new Error("There are no remaining cells.")
        }

        return this.cells.pop()
    }

}
/**
 * MediumAI class extending AI.
 */
class MediumAI extends AI {
    constructor(boardSize = 10) {
        super()
        this.boardSize = boardSize
        this.targetStack = []
        this.huntStack = []
        this.gameboard = new Array(boardSize).fill(0).map(() => new Array(boardSize).fill(0));

        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                this.huntStack.push([row, col])
            }
        }

        AI.shuffle(this.huntStack)

    }
    /**
      * Seeks a target cell for attack.
      *
      * @returns {number[]} The coordinates of the target cell [row, col].
      * @throws {Error} If there is no valid target.
      */
    seek = () => {

        let row, col;

        while (this.targetStack.length > 0) {
            [row, col] = this.targetStack.pop()
            if (this.gameboard[row][col] === 0) {
                this.gameboard[row][col] = 1
                return [row, col]
            }
        }

        while (this.huntStack.length > 0) {
            [row, col] = this.huntStack.pop()
            if (this.gameboard[row][col] === 0) {
                this.gameboard[row][col] = 1
                return [row, col]
            }
        }

        throw new Error("No valid target.")
        //return null;
    }

    updateTargetStack = (row, col, hit = true) => {
        if (hit) {
            if (row > 0 && this.gameboard[row - 1][col] == 0) this.targetStack.push([row - 1, col]);
            if (row < this.boardSize - 1 && this.gameboard[row + 1][col] == 0) this.targetStack.push([row + 1, col])
            if (col > 0 && this.gameboard[row][col - 1] == 0) this.targetStack.push([row, col - 1]);
            if (col < this.boardSize - 1 && this.gameboard[row][col + 1] == 0) this.targetStack.push([row, col + 1]);
        }
    }


}