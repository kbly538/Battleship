export class AIFactory {
    constructor(boardSize = 10) {
        this.boardSize = boardSize
    }

    getEasy = (boardSize) => new EasyAI(boardSize)
    getMedium = (boardSize) => new MediumAI(boardSize)
    getHard = (boardSize) => new EasyAI(boardSize)
}

class AI {
    constructor() {
        
    }

    //selectTarget() { return null; }             // returns list [i,j] of coordinates to fire at 

    //updateHit(i, j, hit=false, ship=null) {}    // call to inform AI that [i,j] is a hit (and which ship) or miss

    //updateSink(ship) {}                         // call to inform AI that ship (number) has sinked

    static shuffle = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            let j = Math.floor(Math.random() * (i + 1))
            let tmp = arr[i]
            arr[i] = arr[j]
            arr[j] = tmp
        }
    }

}



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

    attackTarget = () => {
        if (this.cells.length === 0) {
            throw new Error("There are no remaining cells.")
        }

        return this.cells.pop()
    }

}

class MediumAI extends AI {
    constructor(boardSize = 10) {
        super()
        this.boardSize = boardSize
        this.targetStack  = []
        this.huntStack = []
        this.gameboard = new Array(boardSize).fill(0).map(() => new Array(boardSize).fill(0));

        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                this.huntStack.push([row, col])
            }
        }

        AI.shuffle(this.huntStack)
        
    }

    seek = () => {

        let row, col;

        while (this.targetStack.length > 0)
        {
            [row, col] = this.targetStack.pop()
            if (this.gameboard[row][col] === 0) {
                this.gameboard[row][col] = 1
                return [row ,col]
            }
        }

        while (this.huntStack.length > 0)
        {
            [row, col] = this.huntStack.pop()
            if (this.gameboard[row][col] === 0) {
                this.gameboard[row][col] = 1
                return [row , col]
            }
        }

        throw new Error("No valid target.")
        //return null;
    }

    updateTargetStack = (row, col, hit = true) => {
        if (hit) {
            if (row > 0 && this.gameboard[row-1][col] == 0) this.targetStack.push([row-1, col]);
            if (row < this.boardSize-1 && this.gameboard[row+1][col] == 0) this.targetStack.push([row+1, col])
            if (col > 0 && this.gameboard[row][col-1] == 0) this.targetStack.push([row, col-1]);
            if (col < this.boardSize-1 && this.gameboard[row][col+1] == 0) this.targetStack.push([row, col+1]);
        }
    } 


}