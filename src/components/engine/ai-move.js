import {
    updateTurnSignal,
    updateCellElement,
    updateConsoles,
    updateGridSignal
} from "../UI/update.js"
import { CellStatus } from "../enums.js"

export const processMediumAI = (p1, p2, turn, p1AI, p2AI) => {
    updateConsoles(p1, p2, turn)
    updateGridSignal(turn, p1, p2)
    updateGridSignal(turn, p1, p2)
    let enemy = turn === p1.name ? p2.name : p1.name;
    let attackResult = null
    let targetBoard = document.querySelector(`[belongsto="${enemy}"]`)
    let targetCellHTML;
    //let currentPlayer = turn === p1.name? p2 : p1;



    if (turn === p1.name) {
        updateTurnSignal(turn, p1, p2)
        updateGridSignal(turn, p1, p2)
        let [x, y] = p1AI.seek()
        targetCellHTML = targetBoard.querySelector(`[coord="(${x},${y})"]`)
        attackResult = p2.gameboard.receiveAttack(x, y)
        if (attackResult) p1AI.updateTargetStack(x, y)

    }
    else if (turn === p2.name) {
        updateTurnSignal(turn, p1, p2)
        updateGridSignal(turn, p1, p2)
        let [x, y] = p2AI.seek()
        targetCellHTML = targetBoard.querySelector(`[coord="(${x},${y})"]`)
        attackResult = p1.gameboard.receiveAttack(x, y)
        if (attackResult) p2AI.updateTargetStack(x, y)
    }



    if (attackResult != null) {
        if (attackResult === true) {
            updateCellElement(targetCellHTML, ['attacked'], CellStatus.hit)
            updateConsoles(p1, p2, turn)
            updateGridSignal(turn, p1, p2)

        }
        else {
            updateConsoles(p1, p2, turn)
            updateCellElement(targetCellHTML, ['missed', 'attacked'])
            updateGridSignal(turn, p1, p2)


        }
        updateCellElement(targetCellHTML, ['attacked'], CellStatus.hit)
        updateConsoles(p1, p2, turn)
        updateGridSignal(turn, p1, p2)


        turn = (turn === p1.name ? p2.name : p1.name)
        updateGridSignal(turn, p1, p2)
        updateConsoles(p1, p2, turn)

        if (p1.gameboard.allShips.size === 0 || p2.gameboard.allShips.size === 0) {


            // if (p1.gameboard.allShips.size === 0) {
            //     setTimeout(()=>{
            //         alert("p2 won")
            //     }, 50)
            // }
            // else {
            //     setTimeout(()=>{
            //         alert("p1 won")
            //     }, 50)
            // }

            return [turn, true];
        }



        return [turn, false];
    }



    return [turn, false];
}


/**
 * Process a player's move by updating the game state based on the selected cell.
 *
 * @param {Event} e - The event object representing the player's move.
 * @param {Object} p1 - Player 1 object.
 * @param {Object} p2 - Player 2 object.
 * @param {string} turn - The current turn, either "p1" or "p2".
 * @returns {string} - The updated turn after processing the move.
 */
export const processAIMoves = (p1, p2, turn, p1AI, p2AI) => {

    updateConsoles(p1, p2, turn)
    updateGridSignal(turn, p1, p2)
    updateGridSignal(turn, p1, p2)
    let enemy = turn === p1.name ? p2.name : p1.name;
    let attackResult = null
    let targetBoard = document.querySelector(`[belongsto="${enemy}"]`)
    let targetCellHTML;
    //let currentPlayer = turn === p1.name? p2 : p1;



    if (turn === p1.name) {
        updateTurnSignal(turn, p1, p2)
        updateGridSignal(turn, p1, p2)
        let [x, y] = p1AI.attackTarget()
        targetCellHTML = targetBoard.querySelector(`[coord="(${x},${y})"]`)
        attackResult = p2.gameboard.receiveAttack(x, y)

    }
    else if (turn === p2.name) {
        updateTurnSignal(turn, p1, p2)
        updateGridSignal(turn, p1, p2)
        let [x, y] = p2AI.attackTarget()
        targetCellHTML = targetBoard.querySelector(`[coord="(${x},${y})"]`)
        attackResult = p1.gameboard.receiveAttack(x, y)
    }



    if (attackResult != null) {
        if (attackResult === true) {
            updateCellElement(targetCellHTML, ['attacked'], CellStatus.hit)
            updateConsoles(p1, p2, turn)
            updateGridSignal(turn, p1, p2)

        }
        else {
            updateConsoles(p1, p2, turn)
            updateCellElement(targetCellHTML, ['missed', 'attacked'])
            updateGridSignal(turn, p1, p2)


        }
        updateCellElement(targetCellHTML, ['attacked'], CellStatus.hit)
        updateConsoles(p1, p2, turn)
        updateGridSignal(turn, p1, p2)


        turn = (turn === p1.name ? p2.name : p1.name)
        updateGridSignal(turn, p1, p2)
        updateConsoles(p1, p2, turn)

        if (p1.gameboard.allShips.size === 0 || p2.gameboard.allShips.size === 0) {

            return [turn, true];
        }



        return [turn, false];
    }



    return [turn, false];
}

