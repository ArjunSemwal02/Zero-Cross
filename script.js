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
    titleElement.style.justifySelf = 'center'
    document.body.appendChild(titleElement)
}

const createGameBoardElement = () => {
    gameBoardElement = document.createElement('div')
    gameBoardElement.classList.add('game-board')
    gameBoardElement.style.justifySelf = 'center'
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
            gameCompleteOverlay(`${gameBoard[position1]}'s wins!`)
            return
        }
    }

    const allSquaresUsed = gameBoard.every(square => square !== '')

    if(allSquaresUsed) {
        gameCompleteOverlay(`It's a draw!`)
    }
}

const gameCompleteOverlay = message => {
    const overlayElement = document.createElement('div');

    overlayElement.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
    overlayElement.style.top = '0'
    overlayElement.style.left = '0'
    overlayElement.style.right = '0'
    overlayElement.style.bottom = '0'
    overlayElement.style.position = 'fixed'
    overlayElement.style.display = 'flex'
    overlayElement.style.flexDirection = 'column'
    overlayElement.style.justifyContent = 'center'
    overlayElement.style.alignItems = 'center'
    overlayElement.style.textAlign = 'center'

    const messageElement = document.createElement('h2')
    messageElement.textContent = message
    messageElement.style.color = 'red'
    messageElement.style.fontSize = '4rem'
    
    overlayElement.appendChild(messageElement)
    
    const restartButtonElement = document.createElement('button')
    restartButtonElement.textContent = 'Restart'
    restartButtonElement.style.padding = '1rem'
    restartButtonElement.style.backgroundColor = 'transparent'
    restartButtonElement.style.border = '2px solid red'
    restartButtonElement.style.fontSize = '1.3rem'
    restartButtonElement.style.color = 'red'
    restartButtonElement.style.fontWeight = '600'
    restartButtonElement.style.cursor = 'pointer'

    restartButtonElement.addEventListener('click', () => {
        // window.location.reload()
        document.body.removeChild(overlayElement)
        resetGame()
    })

    overlayElement.appendChild(restartButtonElement)

    document.body.appendChild(overlayElement)
    
}

const resetGame = () => {
    if(gameBoardElement) document.body.removeChild(gameBoardElement)

    gameBoardElement = createGameBoardElement()

    for(let square = 0; square < 9; square++)
        gameBoardElement.appendChild(createSquareElement(square))

    currentPlayer = players[0]
    gameBoard.fill('')

    document.body.appendChild(gameBoardElement)
}

createHeader('Zero-Cross')
resetGame()