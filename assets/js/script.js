// Initial Data

// Receive the data from the HTML
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

// Define the variables that will be used in the game
let turn = '';
let warning = '';
let playing = false;

reset();

//Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

//Functions

// Check if the item is empty and if the game is still going
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if(playing && square[item] === '') {
        square[item] = turn;
        squareRender();
        playerToggle();
    }
}

// Reset the game
function reset() {
    warning = '';

    let randomPlayer = Math.floor(Math.random() * 2);
    turn = (randomPlayer === 0) ? 'x' : 'o';

    for(let i in square) {
        square[i] = '';
    }

    playing = true;

    squareRender();
    infoRender();
}

// Render the game
function squareRender() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    gameCheck();
}

// Render the info
function infoRender() {
    document.querySelector('.vez').innerHTML = turn;
    document.querySelector('.resultado').innerHTML = warning;
}

// Change the player
function playerToggle() {
    if(turn === 'x') {
        turn = 'o';
    } else {
        turn = 'x';
    }
    infoRender();
}

// Check the winner and end the game
function gameCheck() {
    if(checkWinnerFor('x')) {
        warning = 'O "x" venceu';
        playing = false;
    } else if(checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;
    } else if(isFull()) {
        warning = 'Deu empate';
        playing = false;
    } 
}

// Check the winner
function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => square[option] === player);
        if(hasWon) {
            return true;
        }
    }

    return false;
}

// Check if the board is full
function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    }
    return true;
}