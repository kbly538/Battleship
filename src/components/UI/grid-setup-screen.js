import {createGameboardComponent} from "./gameboard.js"

/**

Creates a grid setup menu for a player.
@param {Player} player - The player for whom the grid setup menu is created.
@returns {HTMLElement} The grid setup menu wrapper element.

*/
export const createGridSetupMenu = (player) => {

    // Wrapper
    const gridSetupMenuWrapper = document.createElement('div')
    gridSetupMenuWrapper.classList.add("main-menu-wrapper")

    // Title
    const title = document.createElement('div')
    title.classList.add('game-title')
    title.innerHTML = `
    TABULA INDUSTRIES UNIFIED FLEET CONTROL SYSTEM
        <br>
        COPYRIGHT 1982 - 2023 TABULA INDUSTRIES
    `
    gridSetupMenuWrapper.appendChild(title)

    // Ship Info
    const shipsInfo = document.createElement('p')
    shipsInfo.classList.add('ships-info')
    gridSetupMenuWrapper.appendChild(shipsInfo)



    // Grid
    const setupGrid = createGameboardComponent(player)
    setupGrid.classList.add('setup-grid')
    gridSetupMenuWrapper.appendChild(setupGrid)


    // Tooltip
    const controllerInfo = document.createElement('p')
    controllerInfo.classList.add('orientation-shortcut-info')
    controllerInfo.textContent = "Press 'o' to change the placement axis."
    gridSetupMenuWrapper.appendChild(controllerInfo)


    // Start button
    const startGameBtn = document.createElement('div')
    startGameBtn.classList.add('start-game-btn')
    startGameBtn.textContent = 'Start Game'
    gridSetupMenuWrapper.appendChild(startGameBtn)


    return gridSetupMenuWrapper
}
