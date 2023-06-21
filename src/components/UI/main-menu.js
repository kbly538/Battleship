/**

Sets up the main menu for the game.
@returns {HTMLElement} The main menu wrapper element.
*/

export const setupMainMenu = () => {

    const mainMenuWrapper = document.createElement('div')
    mainMenuWrapper.classList.add("main-menu-wrapper")

    const title = document.createElement('div')
    title.classList.add('game-title')
    title.innerHTML = `
    TABULA INDUSTRIES UNIFIED FLEET CONTROL SYSTEM
        <br>
        COPYRIGHT 1982 - 2023 TABULA INDUSTRIES
    `
    mainMenuWrapper.appendChild(title)


    const form = document.createElement('form')
    const label = document.createElement('label')
    label.htmlFor = 'player-name'
    label.textContent = "Enter your name: "
    form.appendChild(label)

    const nameInput = document.createElement('input')
    nameInput.classList.add('name-input')
    nameInput.id = 'player-name'
    nameInput.type = 'text'
    nameInput.autocomplete = "off"
    nameInput.style.caretColor = "transparent"
    nameInput.placeholder = '|'
    form.appendChild(nameInput)

    const submit = document.createElement('div')
    submit.classList.add('submit-name')
    submit.textContent = 'Confirm'
    form.appendChild(submit)

    mainMenuWrapper.appendChild(form)

    return mainMenuWrapper
}