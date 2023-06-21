export default function Ship(length) {
    this.length = length === undefined || length === null ? 1 : length;
    this.hitCount = 0
    this.isSunk = () => this.hitCount >= this.length;
    this.hit = () => this.hitCount++
}