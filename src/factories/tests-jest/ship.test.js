import Ship from "../ship.js"

describe("Ship", () => {
    let ship;
    
    it("isSunk() should return true for a ship of length 1 when hit count 1", () => {
        ship = new Ship()
        ship.hit()
        expect(ship.isSunk()).toBe(true)
    })
    
    it("isSunk() should return true for a ship of length 2 when hit count 1", () => {
        ship = new Ship(2)
        ship.hit()
        expect(ship.isSunk()).toBe(false)
    })

    it("isSunk() should return true for a ship of length 0 when hit count 0", () => {
        ship = new Ship(0)

        expect(ship.isSunk()).toBe(true)
    })

    it("hitCount should increase after being hit", () => {
        ship = new Ship(1)

        expect(ship.hitCount).toBe(0)
        ship.hit()
        expect(ship.hitCount).toBe(1)
        ship.hit()
        expect(ship.hitCount).toBe(2)
        ship.hit()
        expect(ship.hitCount).toBe(3)

    })

    it("isSunk() should return true if hitCount equals length", () => {
        ship = new Ship(3)
        expect(ship.isSunk()).toBe(false)
        ship.hit()
        ship.hit()
        ship.hit()
        expect(ship.isSunk()).toBe(true)
    })

})

