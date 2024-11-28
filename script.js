const player = ['O', 'X']
const gameBoard = [
    '', '', '',
    '', '', '',
    '', '', '',
]

let currentPlayer
let gameBoardElement

const createHeader = title => {
    const titleElement = document.createElement('h1')
    titleElement.textContent = title
    document.body.appendChild(titleElement)
}

const createGameBoardElement = () => {
    gameBoardElement = document.createElement('div')
    gameBoardElement.classList.add('game-board')
    return gameBoardElement
}

const createSquareElement = squareNumber => {
    const squareElement = document.createElement('div')
    squareElement.classList.add('game-square')
    return squareElement
}

const resetGame = () => {
    gameBoardElement = createGameBoardElement()
    for(let square = 0; square < 9; square++)
        gameBoardElement.appendChild(createSquareElement(square))
    document.body.appendChild(gameBoardElement)
}

createHeader('Zero-Cross')
resetGame()