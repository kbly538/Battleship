export default function Player(name, gameboard, ai = false) {
    this.name = name
    this.gameboard = gameboard
    this.attackAt = (x, y) => [x, y]
    this.isAi = ai
}


