import {
    updateTurnSignal, 
    updateCellElement, 
    updateConsoles, 
    updateGridSignal} from "../UI/update.js"
import {CellStatus} from "../enums.js"

/**
 * Processes a player's move and updates the game state accordingly.
 *
 * @param {Event} e - The click event object.
 * @param {Player} p1 - Player 1 object.
 * @param {Player} p2 - Player 2 object.
 * @param {string} turn - Current turn.
 * @returns {string} The updated turn after processing the move.
 */

export const processPlayerMove = (e, p1, p2, turn) => {

    let targetCellHTML = e.target
    if (targetCellHTML.classList.contains('attacked')) {
        return turn;
    }
    let attackResult = null
    let targetBoard = targetCellHTML.parentElement.getAttribute('belongsTo')
    //let currentPlayer = turn === p1.name? p2 : p1;


    if (turn === p1.name &&
        targetBoard === p2.name) {
        updateTurnSignal(turn, p1, p2)
        updateGridSignal(turn, p1, p2)
        const targetCoords = targetCellHTML.getAttribute("coord")
        const [x, y] = p2.gameboard.parseCoords(targetCoords)
        attackResult = p2.gameboard.receiveAttack(x, y)
    }
    else if (turn === p2.name
        && targetBoard === p1.name) {
        updateTurnSignal(turn, p1, p2)
        updateGridSignal(turn, p1, p2)
        const targetCoords = targetCellHTML.getAttribute("coord")
        const [x, y] = p1.gameboard.parseCoords(targetCoords)
        attackResult = p1.gameboard.receiveAtnametack(x, y)
    }

    if (targetCellHTML.classList.contains('attacked')) return turn

    if (attackResult != null) {
        if (attackResult === true) {
            updateCellElement(targetCellHTML, ['attacked'], CellStatus.hit)
            targetCellHTML.classList.remove('has-ship')
        }
        else {

            updateCellElement(targetCellHTML, ['missed', 'attacked'])

        }



        //turn = (turn === p1.name ? p2.name : p1.name)

        updateConsoles(p1, p2, turn)

        if (p1.gameboard.allShips.size === 0 || p2.gameboard.allShips.size === 0) {
            document.body.remove(document.querySelector('.container'))
            document.body.appendChild(createEndGameModal()) // TODO
        }


        return turn
    }


    return turn
}