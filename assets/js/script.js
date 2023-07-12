// Initial Data
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let turn = '';
let warning = '';
let playing = false;



//Events
document.querySelector('.reset').addEventListener('click', reset);


//Functions
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

function squareRender() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
}

function infoRender() {
    document.querySelector('.vez').innerHTML = turn;
    document.querySelector('.resultado').innerHTML = warning;
}