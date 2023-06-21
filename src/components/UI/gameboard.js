import {createCellElement} from "./cell.js"

/**
 * Create a game board component element for a player.
 *
 * @param {Object} player - Player object.
 * @returns {HTMLElement} - The gameboard component element.
 */
export const createGameboardComponent = (player) => {
    const cellElements = []
    for (let row = 0; row < player.gameboard.grid.length; row++) {
        for (let col = 0; col < player.gameboard.grid.length; col++) {
            const cell = createCellElement()
            cell.setAttribute("coord", player.gameboard.grid[row][col].toString)
            cellElements.push(cell)
        }
    }

    const grid = document.createElement("div")
    grid.classList.add("gameboard-grid")
    cellElements.forEach(cell => grid.appendChild(cell))
    grid.setAttribute('belongsTo', player.name)

    return grid
}