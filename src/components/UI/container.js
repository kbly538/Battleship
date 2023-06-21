import {createGameboardComponent} from "./gameboard.js"

/**
 * Create a game board container element for two players.
 *
 * @param {Object} p1 - Player 1 object.
 * @param {Object} p2 - Player 2 object.
 * @returns {HTMLElement} - The gameboard container element.
 */
export const createGameboardContainer = (p1, p2) => {


    // p1 gameboard container
    const p1GameboardContainer = document.createElement("div")
    p1GameboardContainer.classList.add("gameboard-container")
    p1GameboardContainer.setAttribute("data", p1.name)

    //p1 header
    const p1Header = document.createElement('div')
    p1Header.classList.add("p1-header")
    p1GameboardContainer.appendChild(p1Header)
    p1Header.textContent = p1.name

    // p1 grid
    const P1GameboardComponent = createGameboardComponent(p1)
    p1GameboardContainer.appendChild(P1GameboardComponent)

    // p1 console
    const p1Console = document.createElement('div')
    p1Console.classList.add("p1-console")
    p1GameboardContainer.appendChild(p1Console)


    // p2 gameboard container
    const p2GameboardContainer = document.createElement("div")
    p2GameboardContainer.classList.add("gameboard-container")
    p2GameboardContainer.setAttribute("data", p2.name)


    //p2 header
    const p2Header = document.createElement('div')
    p2Header.classList.add("p2-header")
    p2GameboardContainer.appendChild(p2Header)
    p2Header.textContent = p2.name

    // p2 grid
    const P2gameboardComponent = createGameboardComponent(p2)
    p2GameboardContainer.appendChild(P2gameboardComponent)

    // p2 console
    const p2Console = document.createElement('div')
    p2Console.classList.add("p2-console")
    p2GameboardContainer.appendChild(p2Console)

    // Wrapper container
    const boardsContainer = document.createElement("div")
    boardsContainer.classList.add("container")
    boardsContainer.appendChild(p1GameboardContainer)
    boardsContainer.appendChild(p2GameboardContainer)

    return boardsContainer
}