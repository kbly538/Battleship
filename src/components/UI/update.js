/**
 * Update a cell element with specified class values and cell status.
 *
 * @param {HTMLElement} cellElement - The cell element to update.
 * @param {Array} classValues - An array of class values to add to the cell element.
 * @param {string} cellStatus - The status of the cell. Defaults to "missed".
 */
export const updateCellElement = (cellElement, classValues) => {
    cellElement.classList.add(...classValues)

}


/**

Updates the turn signal to indicate the active player's turn.
@param {string} turn - The name of the active player.
@param {Player} p1 - Player 1 object.
@param {Player} p2 - Player 2 object.
*/
export const updateTurnSignal = (turn, p1, p2) => {
    let turnActiveFor = turn === p1.name ? p1.name : p2.name;
    let header = null

    if (turnActiveFor === p1.name) {
        header = document.querySelector(".p1-header")
        if (header.classList.contains("turn-active")) {
            header.classList.remove("turn-active")
            header.innerText = `${p1.name}`
        }

        header = document.querySelector(".p2-header")
        header.classList.add("turn-active")
        header.innerText = `${p2.name}'s turn`
    } else if (turnActiveFor === p2.name) {
        header = document.querySelector(".p2-header")

        if (header.classList.contains("turn-active")) {
            header.classList.remove("turn-active")
            header.innerText = `${p2.name}`
        }

        header = document.querySelector(".p1-header")
        header.classList.add("turn-active")
        header.innerText = `${p1.name}'s turn`
    }
}
/**

Updates the grid signal to indicate the active player's grid.
@param {string} turn - The name of the active player.
@param {Player} p1 - Player 1 object.
@param {Player} p2 - Player 2 object.
*/
export const updateGridSignal = (turn, p1, p2) => {
    let turnActiveFor = turn === p1.name ? p1.name : p2.name;
    let waitingBoard = null

    if (turnActiveFor === p1.name) {
        // remove turnActive from the other player
        waitingBoard = document.querySelector(`[belongsto=${p2.name}]`)

        if (waitingBoard.classList.contains("waiting-board")) {
            waitingBoard.classList.remove("waiting-board")
        }
        waitingBoard = document.querySelector(`[belongsto=${p1.name}]`)
        waitingBoard.classList.add('waiting-board')


    }
    else if (turnActiveFor === p2.name) {
        waitingBoard = document.querySelector(`[belongsto=${p1.name}]`)
        if (waitingBoard.classList.contains("waiting-board")) {
            waitingBoard.classList.remove("waiting-board")
        }
        waitingBoard = document.querySelector(`[belongsto=${p2.name}]`)
        waitingBoard.classList.add('waiting-board')
    }

}
/**

Updates the console screen with player statistics.
@param {Player} player1 - Player 1 object.
@param {Player} player2 - Player 2 object.
@returns {string} The HTML string representing the updated console screen.
*/
export const updateConsoleScreen = (player1, player2) =>

    `    <div> 
    Hits: ${player1.gameboard.numberOfHitsTaken}
    <br>
    Missed: ${player1.gameboard.missedAttacks.size}
    <br>
    Accuracy: ${(player1.gameboard.numberOfHitsTaken /
        (player1.gameboard.totalAttacksReceived === 0
            ? 1
            : player1.gameboard.totalAttacksReceived)).toFixed(2)}
    <br>
    Ships Remaining: ${player2.gameboard.allShips.size}
    </div>`


/**

Updates the consoles of both players with the updated console screen.
@param {Player} p1 - Player 1 object.
@param {Player} p2 - Player 2 object.
@param {string} turn - The name of the active player.
*/
export const updateConsoles = (p1, p2, turn) => {
    let p1Console = document.querySelector(".p1-console")
    let p2Console = document.querySelector(".p2-console")
    if (turn === p1.name) p1Console.innerHTML = updateConsoleScreen(p2, p1)
    else p2Console.innerHTML = updateConsoleScreen(p1, p2)
}
