const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        lives: document.querySelector('#lives'),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 30,
        lives: 3,
    },
    actions: {
        timerId: null,
        countDownId: null,
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownId);
        clearInterval(state.actions.timerId);
        alert('GAME OVER! Seu resultado foi: ' + state.values.result);
    }
}

function playSound() {
    let audio = new Audio('./src/audios/hit.m4a');
    audio.currentTime = 0;
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

function squareClickHandler(event) {
    const square = event.target;
    if (square.id == state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound();
    } else {
        state.values.lives--;
        state.view.lives.textContent = state.values.lives;
        if (state.values.lives === 0) {
            clearInterval(state.actions.countDownId);
            clearInterval(state.actions.timerId);
            alert('GAME OVER! Seu resultado foi: ' + state.values.result);
        }
    }
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', squareClickHandler);
    });
}

function removeListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.removeEventListener('mousedown', squareClickHandler);
    });
}

function initialize() {
    addListenerHitBox();
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownId = setInterval(countDown, 1000);
}

initialize();

const playAgainButton = document.querySelector('.playagain');

playAgainButton.addEventListener('click', () => {
    removeListenerHitBox();

    state.values.result = 0;
    state.values.currentTime = 30;
    state.values.lives = 3;

    state.view.score.textContent = state.values.result;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.lives.textContent = state.values.lives;

    clearInterval(state.actions.countDownId);
    clearInterval(state.actions.timerId);

    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownId = setInterval(countDown, 1000);

    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });

    addListenerHitBox();
});
