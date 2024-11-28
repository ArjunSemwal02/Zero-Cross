const players = ['O', 'X']
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

    squareElement.addEventListener('click', (event) => {
        const {target} = event
        target.textContent = currentPlayer
        gameBoard[squareNumber] = currentPlayer
        checkBoard()
        switchPlayer()
    }, {once: true})

    return squareElement
}

const switchPlayer = () => {
    if(currentPlayer === players[0])   currentPlayer = players[1]
    else currentPlayer = players[0]
}

const checkBoard = () => {
    // game Board
    // [
    //     ['0', '1', '2'],
    //     ['3', '4', '5'],
    //     ['6', '7', '8'],
    // ]

    const winStates = [
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['0', '4', '8'],
        ['6', '4', '2'],
    ]

    for( let winState of winStates){
        const [position1, position2, position3] = winState

        if(gameBoard[position1] !== '' &&
            gameBoard[position1] === gameBoard[position2] &&
            gameBoard[position1] === gameBoard[position3]
        ){
            alert(`${gameBoard[position1]}'s wins`)
            return
        }
    }

    const allSquaresUsed = gameBoard.every(square => square !== '')

    if(allSquaresUsed) {
        alert(`It's a draw!`)
    }
}

const resetGame = () => {
    gameBoardElement = createGameBoardElement()
    for(let square = 0; square < 9; square++)
        gameBoardElement.appendChild(createSquareElement(square))
    currentPlayer = players[0]
    document.body.appendChild(gameBoardElement)
}

createHeader('Zero-Cross')
resetGame()