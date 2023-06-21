/**

Generates random coordinates.
@returns {number[]} An array containing two random coordinates [x, y].
*/
export const generateRandomCoord = () => {
    const x = Math.floor(Math.random() * 10)
    const y = Math.floor(Math.random() * 10)

    return [x, y]

}