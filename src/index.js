import Gameboard from "./factories/gameboard.js"
import Ship from "./factories/ship.js"
import Player from "./factories/player.js"
import {setupMainMenu} from "./components/UI/main-menu.js"
import {createGridSetupMenu} from "./components/UI/grid-setup-screen.js"
import {createGameboardContainer} from "./components/UI/container.js"
import {processPlayerMove} from "./components/engine/player-move.js"
import {AIFactory} from "./components/engine/AI.js"
import {processMediumAI, processAIMoves} from "./components/engine/ai-move.js"

import {
    ShipNames, 
    EMPTY_CELL_COLOR, 
    AVAILABLE_CELL_COLOR, 
    UNAVAILABLE_CELL_COLOR,
    MISSED_BACKGROUNDCOLOR, 
    HIT_BACKGROUNDCOLOR, 
    PLACED_SHIP_COLOR} from "./components/game.config.js"


let axis = 'v'
let activeCell = ''
let cleaned = false
let shipQueue = [new Ship(5), new Ship(4), new Ship(3), new Ship(2), new Ship(2), new Ship(1), new Ship(1)]
shipQueue = shipQueue.reverse()
let ship = shipQueue[shipQueue.length - 1]
let startGameBtn = ''


let mainMenu = setupMainMenu()
document.body.appendChild(mainMenu)


const playerNameInput = document.querySelector('.name-input')
const confirmButton = document.querySelector('.submit-name')
const form = document.querySelector('form')

let playerName;
let p1Gameboard;
let p1;
let p2Gameboard;
let p2;


// Prevent submitting when pressed enter
form.addEventListener('submit', (e) => { e.preventDefault() })


// Change the ship axis while placing and clean up the cell coloring
window.addEventListener('keypress', (e) => {
    if (shipQueue.length === 0) return
    if (e.key === 'o') axis = axis === 'v' ? 'h' : 'v'
    if (activeCell) {

        let occupiedCells = document.querySelectorAll('.occupied')
        occupiedCells.forEach(c => {
            c.classList.remove('occupied')
        })
        activeCell.dispatchEvent(new Event('mouseover'))
        let allCell = document.querySelectorAll('.cell')
        allCell.forEach(cell => {
            let cellHasShip = cell.classList.contains('has-ship')
            let cellOccupied = cell.classList.contains('occupied')
            if (!cellOccupied && !cellHasShip) {
                cell.style.background = EMPTY_CELL_COLOR
            }
        })
    }
})

let gameResults = []
let numberOfGames = 3
let tmpnum = numberOfGames

confirmButton.addEventListener('click', (e) => {
    playerName = playerNameInput.value ? playerNameInput.value : "Unknown"
    
    // Prepare player 1
    p1Gameboard = new Gameboard()
    p1 = new Player(playerName, p1Gameboard, true)

    // Prepare player 2
    p2Gameboard = new Gameboard()
    p2Gameboard.populateGameboard()
    p2 = new Player("CPU", p2Gameboard, true)

    if (p1.isAi && p2.isAi) {
        let aiFactory = new AIFactory()
        let p1dif = "easy"
        let p2dif = "medium"
        let p1AI = aiFactory.getEasy(10)
        let p2AI = aiFactory.getMedium(10)
        p1.gameboard.populateGameboard()
        p2.gameboard.populateGameboard()


        document.body.removeChild(mainMenu)
        const boardsContainer = createGameboardContainer(p1, p2)

        document.body.appendChild(boardsContainer)
        let p1board = document.querySelector(`[belongsto=${p1.name}]`)
        p1.gameboard.grid.forEach(row => row.forEach(col => {
            if (col.hasShip) p1board.querySelector(`[coord="(${col.x},${col.y})"]`).classList.add('has-ship')

        }))

        let p2board = document.querySelector(`[belongsto=${p2.name}]`)
        p2.gameboard.grid.forEach(row => row.forEach(col => {
            if (col.hasShip) p2board.querySelector(`[coord="(${col.x},${col.y})"]`).classList.add('has-ship')

        }))

        let consoleDefault = `    <div> 
                                Hits: ${0}
                                <br>
                                Missed: ${0}
                                <br>
                                Accuracy: ${0}
                                <br>
                                Ships Remaining: ${7}
                                </div>`


        // Prepare console
        const p1Console = document.querySelector(".p1-console")
        const p2Console = document.querySelector(".p2-console")

        p1Console.innerHTML = consoleDefault
        p2Console.innerHTML = consoleDefault

        const cells = document.querySelectorAll('.cell')
        let turnOf = p1.name
        let turn = [turnOf, false]




        let p1header = document.querySelector(".p1-header")
        p1header.classList.add('turn-active')
        p1header.textContent = `${p1.name}'s turn`

        let waitingBoard = document.querySelector(`[belongsto=${p2.name}]`)
        waitingBoard.classList.add('waiting-board')


        if (p1.gameboard.allShips.size !== 0 && p2.gameboard.allShips.size !== 0)
        {

            if (numberOfGames > 0)
            {
                let a = setInterval(()=>{
                    if (turn[1] !== true )
                    {
                        if (turn[0] === p1.name) {
                            if (p1dif === "easy")
                            {
                                turn = processAIMoves(p1, p2, turnOf, p1AI, p2AI)
                            } else {
                                turn = processMediumAI(p1, p2, turnOf, p1AI, p2AI)
                            }
                        } else if (turn[0] === p2.name) {
                            if (p2dif === "easy")
                            {
                                turn = processAIMoves(p1, p2, turnOf, p1AI, p2AI)
                            } else {
                                turn = processMediumAI(p1, p2, turnOf, p1AI, p2AI)
                            }
                        }
                        turnOf = turn[0]
                    } else {
                        clearInterval(a)
                        
                        gameResults.push(turnOf === p1.name ? p2.name : p1.name)
                        
                        p1Gameboard = new Gameboard()
                        p2Gameboard = new Gameboard()
                        p1Gameboard.populateGameboard()
                        p2Gameboard.populateGameboard()
                        numberOfGames--
                        document.body.removeChild(boardsContainer)
                        document.body.appendChild(mainMenu)
                        confirmButton.click()
                    }
                    
                }, 1)  
            }
             
            
        }
        
        console.log(numberOfGames)
      

        if (numberOfGames === 0)
        {
            let p1wins = gameResults.filter((n) => n === p1.name).length
            let p2wins = gameResults.filter((n) => n === p2.name).length
            let winner = ""
            if (p1wins > p2wins) winner = p1.name
            else if (p2wins > p1wins) winner = p2.name
            else winner = "Equal" 
            console.log("Total games: ", tmpnum)
            console.log(`${winner} win rate: `, (Math.max(p1wins, p2wins) / tmpnum).toFixed(2))
    
        }
    } else {
        // Remove main manu and bring grid setup screen
        document.body.removeChild(mainMenu)
        let gridSetupMenu = createGridSetupMenu(p1)
        document.body.appendChild(gridSetupMenu)


        // P1 Grid for placing ships
        const setupGridCells = document.querySelectorAll(".setup-grid > .cell")
        const shipsInfo = document.querySelector('.ships-info')
        shipsInfo.textContent = `Place your '${ShipNames[shipQueue[shipQueue.length - 1].length]}'`

        setupGridCells.forEach(c => c.addEventListener('mouseover', (e) => {

            ship = shipQueue[shipQueue.length - 1]
            // Ready to play if queue is empty
            if (!ship) {
                document.querySelector('.start-game-btn').classList.add('start-pulse')
                shipsInfo.textContent = "Start game..."
                return
            }



            let cell = e.target
            activeCell = cell // track which cell is hovered on
            let [x, y] = p1.gameboard.parseCoords(cell.getAttribute('coord'))

            // Precalculate the place ship will cover
            // change color of the cells according to availability
            // Return prematurely if one of precalculated cells is out of bounds
            for (let shipLen = 0; shipLen < ship.length; shipLen++) {
                // Vertical availability
                if (axis === 'v') {
                    let searchingFor = `[coord="(${x + shipLen},${y})"]`
                    let shipCell = document.querySelector(searchingFor)
                    if (shipCell === null) return
                    if (shipCell && !p1.gameboard.grid[x + shipLen][y].hasShip) {
                        shipCell.style.background = AVAILABLE_CELL_COLOR
                        shipCell.classList.add('occupied')
                    } else {
                        shipCell.style.background = UNAVAILABLE_CELL_COLOR
                    }
                    // Horizontal Availability
                } else if (axis === 'h') {
                    let searchingFor = `[coord="(${x},${y + shipLen})"]`
                    let shipCell = document.querySelector(searchingFor)
                    if (shipCell === null) return
                    if (shipCell && !p1.gameboard.grid[x][y + shipLen].hasShip) {
                        shipCell.style.background = AVAILABLE_CELL_COLOR
                        shipCell.classList.add('occupied')
                    } else {
                        shipCell.style.background = UNAVAILABLE_CELL_COLOR
                    }
                }
            }
        }))


        // Clean up the colors after mouse leaves the cell that has been hovered on
        setupGridCells.forEach(c => c.addEventListener('mouseleave', (e) => {
            ship = shipQueue[shipQueue.length - 1]
            if (!ship) return
            let cell = e.target
            let [x, y] = p1.gameboard.parseCoords(cell.getAttribute('coord'))
            for (let shipLen = 0; shipLen < ship.length; shipLen++) {
                if (axis === 'v') {
                    let searchingFor = `[coord="(${x + shipLen},${y})"]`
                    let shipCell = document.querySelector(searchingFor)

                    if (shipCell && !p1.gameboard.grid[x + shipLen][y].hasShip) {
                        shipCell.style.background = EMPTY_CELL_COLOR
                    }
                }
                else if (axis === 'h') {
                    let searchingFor = `[coord="(${x},${y + shipLen})"]`
                    let shipCell = document.querySelector(searchingFor)

                    if (shipCell && !p1.gameboard.grid[x][y + shipLen].hasShip) {
                        shipCell.style.background = EMPTY_CELL_COLOR
                    }
                }
                cleaned = false
            }
            if (!cleaned) {
                let allCell = document.querySelectorAll('.cell')
                allCell.forEach(cell => {
                    let [x, y] = p1.gameboard.parseCoords(cell.getAttribute('coord'))
                    if (!p1.gameboard.grid[x][y].hasShip) {
                        cell.style.background = EMPTY_CELL_COLOR
                    } else {
                        cell.style.background = PLACED_SHIP_COLOR
                    }

                    if (cell.classList.contains('occupied')) cell.classList.remove('occupied')
                })
                cleaned = true
            }


        }))

        // Place ships from the queue
        setupGridCells.forEach(c => c.addEventListener('click', (e) => {
            if (shipQueue.length === 0) {
                shipsInfo.textContent = "Start game..."
                return;
            }
            let cell = e.target
            ship = shipQueue.pop()
            let coords = p1.gameboard.parseCoords(cell.getAttribute('coord'))
            let placedShip = p1.gameboard.placeShip(...coords, ship, axis)
            if (!placedShip) {
                shipQueue.push(ship)
                return;
            }
            if (placedShip) {
                for (let shipLen = 0; shipLen < ship.length; shipLen++) {
                    let cell = e.target
                    let [x, y] = p1.gameboard.parseCoords(cell.getAttribute('coord'))
                    let searchingFor = ""
                    if (axis === 'v') {
                        searchingFor = `[coord="(${x + shipLen},${y})"]`
                    } else {
                        searchingFor = `[coord="(${x},${y + shipLen})"]`
                    }
                    let shipCell = document.querySelector(searchingFor)
                    if (shipCell) {
                        shipCell.classList.add('has-ship')
                        shipCell.style.background = PLACED_SHIP_COLOR
                    }
                }
            }

            const cells = document.querySelectorAll('.has-ship')
            cells.forEach(c => c.style.background = 'green')
            activeCell.dispatchEvent(new Event('mouseover'))
            if (shipQueue.length !== 0) {
                shipsInfo.textContent = `Place your '${ShipNames[shipQueue[shipQueue.length - 1].length]}'`
            }
        }))


        // Initialize main game loop
        startGameBtn = document.querySelector('.start-game-btn')
        startGameBtn.addEventListener('click', () => {

            const boardsContainer = createGameboardContainer(p1, p2)

            document.body.removeChild(gridSetupMenu)
            document.body.appendChild(boardsContainer)
            p1.gameboard.grid.forEach(row => row.forEach(col => {
                if (col.hasShip) document.querySelector(`[coord="(${col.x},${col.y})"]`).classList.add('has-ship')

            }))

            p2.gameboard.grid.forEach(row => row.forEach(col => {
                if (col.hasShip) document.querySelector(`[coord="(${col.x},${col.y})"]`).classList.add('has-ship')

            }))

            let consoleDefault = `    <div> 
                                Hits: ${0}
                                <br>
                                Missed: ${0}
                                <br>
                                Accuracy: ${0}
                                <br>
                                Ships Remaining: ${7}
                                </div>`


            // Prepare console
            const p1Console = document.querySelector(".p1-console")
            const p2Console = document.querySelector(".p2-console")

            p1Console.innerHTML = consoleDefault
            p2Console.innerHTML = consoleDefault

            const cells = document.querySelectorAll('.cell')
            let turn = p1.name




            let p1header = document.querySelector(".p1-header")
            p1header.classList.add('turn-active')
            p1header.textContent = `${p1.name}'s turn`

            let waitingBoard = document.querySelector(`[belongsto=${p2.name}]`)
            waitingBoard.classList.add('waiting-board')


            // Listen for cell events
            cells.forEach(c => c.addEventListener("mouseover", (e) => {
                e.target.classList.add("targetAcquired")
            }))

            cells.forEach(c => c.addEventListener('mouseleave', (e) => {
                e.target.classList.remove("targetAcquired")
            }))


            cells.forEach(c => c.addEventListener("click", (e) => {
                turn = processPlayerMove(e, p1, p2, turn)
            }))


        })
    }




})

