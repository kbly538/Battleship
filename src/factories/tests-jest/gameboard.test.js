import Gameboard, {Node} from "../gameboard.js"
import Ship from "../ship.js";

describe("Gameboard", () => {


    it('Gameboard should initialize with correct dimensions', () => {
        const gameboard = new Gameboard();
        expect(gameboard.HEIGHT).toBe(10);
        expect(gameboard.WIDTH).toBe(10);
    });

    it('Node should have correct properties and methods', () => {
        const node = new Node(2, 3);
        expect(node.x).toBe(2);
        expect(node.y).toBe(3);
        expect(node.toString).toBe('(2,3)');
        expect(node.hit).toBe(false);
        expect(node.hasShip).toBe(false);
    });

    it('Gameboard should create nodes with correct positions', () => {
        const gameboard = new Gameboard();
        const node = gameboard.inspectPos(2, 3);
        expect(node.x).toBe(2);
        expect(node.y).toBe(3);
    });


    it("inpectPos(0, 0) should return the node at (0, 0)", () => {
        const gameboard = new Gameboard()
        let fakeNode = new Node(0, 0)
        let targetNode = gameboard.inspectPos(0, 0)

        expect(targetNode).toStrictEqual(fakeNode)
    })

    it("positionValid should return true if x and y greater than 0 and less than 10", () => {
        const board = new Gameboard()
        board.createGameboard()
        expect(board.positionValid(0, 0)).toBe(true)
        expect(board.positionValid(5, 3)).toBe(true)
        expect(board.positionValid(9, 9)).toBe(true)
        expect(board.positionValid(2, 5)).toBe(true)
        expect(board.positionValid(-1, -2)).toBe(false)
        expect(board.positionValid(10, 9)).toBe(false)
        expect(board.positionValid(5, 12)).toBe(false)


    })

    it("placeShip(2, 5, new Ship(2), v) should place a ship of length 2 starting from r:2 c:5 vertically", () => {
        const board = new Gameboard()
        let ship = new Ship(2)
        board.placeShip(2, 5, ship, 'v')

        expect(board.grid[2][5].hasShip).toBe(ship)
        expect(board.grid[3][5].hasShip).toBe(ship)
    })

    it("shouldn't place a ship if the cell is has a ship on it", () => {
        const board = new Gameboard()
        board.placeShip(2, 5, new Ship(2), 'v')
        expect(board.placeShip(2, 5, new Ship(2), 'h')).toBe(false)
        expect(board.placeShip(3, 5, new Ship(2), 'h')).toBe(false)
        expect(board.placeShip(4, 5, new Ship(2), 'h')).toBe(true)

    })



    it("shouldn't place a ship if the cell is has a ship on it", () => {
        const board = new Gameboard()
        board.createGameboard()
        board.placeShip(0, 0, new Ship(3), 'h')
        expect(board.placeShip(0, 0, new Ship(2), 'v')).toBe(false)
        expect(board.placeShip(0, 1, new Ship(2), 'v')).toBe(false)
        expect(board.placeShip(0, 2, new Ship(2), 'v')).toBe(false)

        expect(board.placeShip(1, 0, new Ship(2), 'v')).toBe(true)
        expect(board.placeShip(1, 1, new Ship(2), 'v')).toBe(true)
        expect(board.placeShip(1, 2, new Ship(2), 'v')).toBe(true)

    })

    it("after placing a ship allShips array is updated", () => {
        const board = new Gameboard()
        board.createGameboard()
        expect(board.allShips.size).toBe(0)
        board.placeShip(0, 0, new Ship(3), 'h')
        expect(board.allShips.size).toBe(1)
        board.placeShip(1, 1, new Ship(3), 'v')
        expect(board.allShips.size).toBe(2)
    })

    it("placeShip should return false if the ship to be added is already in the allShips array", () => {
        const board = new Gameboard()
        board.createGameboard()
        expect(board.allShips.size).toBe(0)
        let ship = new Ship(1)
        expect(board.allShips.size).toBe(0)
        expect(board.placeShip(1, 1, ship, 'h')).toBe(true)
        expect(board.allShips.size).toBe(1)
        expect(board.placeShip(9, 9, ship, 'h')).toBe(false)
        expect(board.allShips.size).toBe(1)
        expect(board.placeShip(9, 9, new Ship(1), 'h')).toBe(true)
        expect(board.allShips.size).toBe(2)
    })

    it("board can be placed 7 types of ship with place ship", () => {
        const board = new Gameboard()
        let aircraftCarrier = new Ship(5)
        let battleship = new Ship(4)
        let cruiser = new Ship(3)
        let destroyerNo1 = new Ship(2)
        let destroyerNo2 = new Ship(2)
        let submarineNo1 = new Ship(1)
        let submarineNo2 = new Ship(1)
        let shipStack = [aircraftCarrier, battleship, cruiser,
            destroyerNo1, destroyerNo2,
            submarineNo1, submarineNo2]
        let orientations = ['h', 'v']
        let currentShip = shipStack.pop()
        expect(board.placeShip(0, 0, currentShip, 'v')).toBe(true)
        currentShip = shipStack.pop()
        expect(board.placeShip(0, 1, currentShip, 'v')).toBe(true)
        currentShip = shipStack.pop()
        expect(board.placeShip(0, 2, currentShip, 'v')).toBe(true)
        currentShip = shipStack.pop()
        expect(board.placeShip(0, 3, currentShip, 'v')).toBe(true)
        currentShip = shipStack.pop()
        expect(board.placeShip(0, 4, currentShip, 'v')).toBe(true)
        currentShip = shipStack.pop()
        expect(board.placeShip(0, 5, currentShip, 'v')).toBe(true)
        currentShip = shipStack.pop()
        expect(board.placeShip(0, 6, currentShip, 'v')).toBe(true)
        currentShip = shipStack.pop()
        expect(currentShip).toBeFalsy()
        expect(board.placeShip(0, 7, currentShip, 'v')).toBe(false)
    })

    it("placeShip should return false if all ships(7) are placed", () => {
        const board = new Gameboard()
        expect(board.allShips.size).toBe(0)
        let ship1 = new Ship(1)
        let ship2 = new Ship(1)
        let ship3 = new Ship(1)
        let ship4 = new Ship(1)
        let ship5 = new Ship(1)
        let ship6 = new Ship(1)
        let ship7 = new Ship(1)
        let ship8 = new Ship(1)
        expect(board.placeShip(0, 0, ship1, 'h')).toBe(true)
        expect(board.placeShip(0, 1, ship2, 'h')).toBe(true)
        expect(board.placeShip(0, 2, ship3, 'h')).toBe(true)
        expect(board.placeShip(0, 3, ship4, 'h')).toBe(true)
        expect(board.placeShip(0, 4, ship5, 'h')).toBe(true)
        expect(board.placeShip(0, 5, ship6, 'h')).toBe(true)
        expect(board.placeShip(0, 6, ship7, 'h')).toBe(true)
        expect(board.placeShip(9, 9, ship8, 'h')).toBe(false)

    })


    it("receiveAttack(1,1) should return true if a ship is hit and false otherwise", () => {
        const board = new Gameboard()
        board.placeShip(1, 1, new Ship(1), 'v')
        expect(board.receiveAttack(1, 1)).toBe(true)
        expect(board.receiveAttack(1, 2)).toBe(false)
    })

    it("'(x,y)' should be added to missedAttacks array if (x,y) hasShip is false", () => {
        const board = new Gameboard()
        board.receiveAttack(1, 1)
        expect(board.missedAttacks.size).toBe(1)
        expect(board.missedAttacks.has(`(${1},${1})`)).toBe(true)
    })

    it("'(x,y)' should NOT be added to missedAttacks array if (x,y) hasShip is true", () => {
        const board = new Gameboard()
        let ship = new Ship(1)
        board.placeShip(9, 9, ship, 'v')
        expect(board.grid[9][9].hasShip).toBeTruthy()
        board.receiveAttack(9, 9)
        expect(board.missedAttacks.size).toBe(0)
        expect(board.missedAttacks.has(`(${1},${1})`)).toBe(false)
    })

    it("allSunk() should return true if no ships left on the board", () => {
        const board = new Gameboard()
        expect(board.allSunk()).toBe(true)
    })

    it("allSunk() should return false if there is a ship on the board", () => {
        const board = new Gameboard()
        let ship = new Ship(1)
        board.placeShip(1, 1, ship, 'v')
        expect(board.allSunk()).toBe(false)
    })


    it("updateShipList should add a ship to the allShips array.", () => {
        const board = new Gameboard()
        let ship = new Ship(1)
        expect(board.allShips.size).toBe(0)
        board.updateShipList(ship)
        expect(board.allShips.size).toBe(1)
    })

    it("updateShipList should NOT add a ship to the allShips array if it already exists.", () => {
        const board = new Gameboard()
        let ship = new Ship(1)
        expect(board.allShips.size).toBe(0)
        board.updateShipList(ship)
        board.updateShipList(ship)
        expect(board.allShips.size).toBe(1)
        let ship2 = new Ship(2)
        board.updateShipList(ship2)
        expect(board.allShips.size).toBe(2)
        board.updateShipList(ship2)
        expect(board.allShips.size).toBe(2)
    })

    it("populateGameboard should randomly place ships(7) on the gameboard", () => {
        const board = new Gameboard()
        board.populateGameboard()
        expect(board.allShips.size).toBe(7)
    })

    it("A ship should be removed from allShips after destroyed", () => {
        const board = new Gameboard()
        expect(board.allShips.size).toBe(0)
        let ship = new Ship(3)
        board.placeShip(0, 0, ship, 'h')
        expect(board.allShips.size).toBe(1)
        board.receiveAttack(0, 0)
        board.receiveAttack(0, 1)
        board.receiveAttack(0, 2)
        expect(board.allShips.size).toBe(0)
    })


    it("allSunk() should return true after all ships area cleared", () => {
        const board = new Gameboard()
        board.populateGameboard()
        expect(board.allShips.size).toBe(7)
        expect(board.allSunk()).toBe(false)
        for (let row of board.grid) {
            for (let cell of row) {
                board.receiveAttack(cell.x, cell.y)
                if (board.allShips.size !== 0) {
                    expect(board.allSunk()).toBe(false)
                }
            }
        }
        expect(board.allShips.size).toBe(0)
        expect(board.allSunk()).toBe(true)
    })

    it("missedAttacks should return 0 at the beginning of the game and 82 when finished", () => {
        const board = new Gameboard()
        board.populateGameboard()
        expect(board.missedAttacks.size).toBe(0)
        for (let row of board.grid) {
            for (let cell of row) {
                board.receiveAttack(cell.x, cell.y)
            }
        }
        expect(board.missedAttacks.size).toBe(82)
    })

    it("parseCoords('(x, y)') should return [x, y]", () => {
        const board = new Gameboard()
        expect(board.parseCoords("(1, 2)")).toEqual([1, 2])
        expect(board.parseCoords("(25, 30)")).toEqual([25, 30])
        expect(board.parseCoords("(999, 999)")).toEqual([999, 999])
    })

    it("after receiving an attack hit count and total attacks received should increase", () => {
        const board = new Gameboard()
        let ship = new Ship(5)
        board.placeShip(0, 0, ship, 'v')
        board.receiveAttack(1, 1)
        expect(board.totalAttacksReceived).toBe(1)
        expect(board.numberOfHitsTaken).toBe(0)
        expect(board.missedAttacks.size).toBe(1)
        board.receiveAttack(0, 0)
        expect(board.totalAttacksReceived).toBe(2)
        expect(board.numberOfHitsTaken).toBe(1)
        expect(board.missedAttacks.size).toBe(1)
        board.receiveAttack(1, 0)
        expect(board.totalAttacksReceived).toBe(3)
        expect(board.numberOfHitsTaken).toBe(2)
        expect(board.missedAttacks.size).toBe(1)
    })

})


describe("Ready to play gameboard", () => {


    it("setupGameboard() should create a fully function battleship gameboard.", () => {
        const board = new Gameboard()
        //let gameboard = board.setupGameboard()

        expect(board.WIDTH).toBe(10)
        expect(board.HEIGHT).toBe(10)
        expect(board.allShips.size).toBe(0)
        expect(board.missedAttacks.size).toBe(0)
    })

})