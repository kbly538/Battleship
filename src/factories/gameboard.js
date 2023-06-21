import Ship from "./ship.js"

export function Node(x, y) {
    this.x = x
    this.y = y
    this.toString = `(${x},${y})`
    this.hit = false
    this.hasShip = false
}

export default function Gameboard() {

    this.HEIGHT = 10
    this.WIDTH = 10
    this.MAX_NUM_OF_SHIPS = 7
    this.missedAttacks = new Set()
    this.allShips = new Set()
    this.numberOfHitsTaken = 0
    this.totalAttacksReceived = 0

    this.createGameboard = () => {

        let board = []
        for (let row = 0; row < this.HEIGHT; row++) {
            let tempRow = []
            for (let col = 0; col < this.WIDTH; col++) {
                // Create a node at row col
                let node = new Node(row, col)
                tempRow.push(node)
            }
            // Populate board
            board.push(tempRow)
        }
        return board
    }

    this.grid = this.createGameboard()

    this.inspectPos = (x, y) => this.grid[x][y]

    this.placeShip = (x, y, ship, orientation) => {
        let positionNotValid = !this.positionValid(x, y)
        let hasNoSpace = !this.boardHasSpace()
        if (positionNotValid || hasNoSpace || this.allShips.has(ship)) return false

        switch (orientation) {
            case 'v':
                if (!this.positionValid(x + ship.length - 1, y)) return false
                // Check if all the cells required available
                let row = 0
                for (row = 0; row < ship.length; row++) {
                    if (!this.positionAvailable(x + row, y)) return false
                }
                // fill the cells
                for (row = 0; row < ship.length; row++) {
                    this.grid[x + row][y].hasShip = ship
                }
                this.updateShipList(ship)
                break;

            case 'h':
                if (!this.positionValid(x, y + ship.length - 1)) return false
                // Check if all the cells required available
                let col = 0
                for (col = 0; col < ship.length; col++) {
                    if (!this.positionAvailable(x, y + col)) return false
                }
                // fill the cells
                for (col = 0; col < ship.length; col++) {
                    this.grid[x][y + col].hasShip = ship
                }
                this.updateShipList(ship)
                break;

            default:
                break;
        }


        return true
    }

    this.positionValid = (x, y) => (x >= 0 && x < 10) && (y >= 0 && y < 10)
    this.positionAvailable = (x, y) => this.grid[x][y].hasShip === false
    this.boardHasSpace = () => this.allShips.size < this.MAX_NUM_OF_SHIPS

    this.receiveAttack = (x, y) => {
        let ship = this.grid[x][y].hasShip
        this.totalAttacksReceived += 1
        if (ship) {
            ship.hit()
            this.grid[x][y].hasShip = false
            if (ship.isSunk()) this.allShips.delete(ship)
            this.numberOfHitsTaken += 1
            return true

        } else if (this.grid[x][y].hasShip === false) {
            this.missedAttacks.add(`(${x},${y})`)
        }
        return false
    }

    this.allSunk = () => {
        return this.allShips.size > 0 ? false : true;
    }

    this.updateShipList = (ship) => {
        this.allShips.add(ship)
    }

    this.populateGameboard = () => {
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

        while (this.allShips.size !== 7) {
            let currentShip = shipStack.pop()
            let result = false
            let triedCells = new Set()
            while (currentShip && !result) {

                let randomX = Math.floor(Math.random() * (this.HEIGHT - currentShip.length) + 1)
                let randomY = Math.floor(Math.random() * (this.WIDTH - currentShip.length) + 1)
                let randomOrientation = Math.floor(Math.random() * 2)
                let cell = `${randomX}${randomY}${orientations[randomOrientation]}`
                if (triedCells.has(cell)) continue
                triedCells.add(cell)
                let shipAdded = this.placeShip(randomX, randomY, currentShip, orientations[randomOrientation])
                result = shipAdded

            }

        }


    }

    this.setupGameboard = () => {
        let gameboard = this.createGameboard()

        return gameboard
    }

    this.drawGameboard = () => {
        for (let row = 0; row < this.WIDTH; row++) {
            for (let col = 0; col < this.HEIGHT; col++) {
                let cell = this.grid[row][col]
                if (cell.hasShip) process.stdout.write(`${cell.hasShip.length}`)
                else process.stdout.write('.')
            }
            process.stdout.write('\n')
        }
    }

    this.parseCoords = (coordsString) => {
        const parsedStr = coordsString.split(',')
        const x = parsedStr[0].slice(1)
        const y = parsedStr[1].slice(0, parsedStr[1].length - 1).trim()

        return [Number(x), Number(y)]
    }

}

