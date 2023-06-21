import Gameboard from "./gameboard.js";

import Player from "./player.js"
import Ship from "./ship.js";

describe("Player behaviour", () => {
    
    let player1;
    let player2;


    beforeEach(() => {
        const p1board = new Gameboard()
        const p2board = new Gameboard()
        
        player1 = new Player("p1", p1board)
        player2 = new Player("p2", p2board)
        
    })

    describe("Initial state", () => {
        it("player1 and player2 have gameboards", () => {
            expect(player1.gameboard).toBeTruthy()
            expect(player2.gameboard).toBeTruthy()
        })
    
        it("player1 and player2 have seperate gameboards", () => {
            expect(player1.gameboard === player2.gameboard).toBe(false)
            player1.gameboard.placeShip(0, 0, new Ship(2), 'h')
            player2.gameboard.placeShip(0, 0, new Ship(2), 'h')
            expect(player1.gameboard.grid[0][0].hasShip.length).toBe(2)
            expect(player2.gameboard.grid[0][0].hasShip.length).toBe(2)
        })

        it("gameboards are populated properly for each player", () => {
            player1.gameboard.populateGameboard()
            player2.gameboard.populateGameboard()
            expect(player1.gameboard.allShips.size).toBe(7)
            expect(player2.gameboard.allShips.size).toBe(7)
        })

    })

    describe("Attacking", () => {
        it("number of missed attacks increases for corresponding board when a player misses", () => {
            expect(player2.gameboard.missedAttacks.size).toBe(0)
            let result = player2.gameboard.receiveAttack(...player1.attackAt(0, 0))
            expect(result).toBe(false)
            expect(player2.gameboard.missedAttacks.size).toBe(1)
        })
        it("number of missed attacks does NOT increase if hit is success", () => {
            let ship = new Ship(1)
            player1.gameboard.placeShip(0, 0, ship, 'v')
            expect(player1.gameboard.missedAttacks.size).toBe(0)
            player1.gameboard.receiveAttack(...player2.attackAt(0,1))
            expect(player1.gameboard.missedAttacks.size).toBe(1)
            player1.gameboard.receiveAttack(...player2.attackAt(0,0))
            expect(player1.gameboard.missedAttacks.size).toBe(1)
            
        })
    })



}) 