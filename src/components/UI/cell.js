/**
    Creates a single div representing a gameboard cell.
    @returns {HTMLDivElement} - Cell
*/
export const createCellElement = () => {

    const cell = document.createElement("div")
    cell.classList.add("cell")

    return cell
}

