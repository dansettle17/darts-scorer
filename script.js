let scores = { 1: 501, 2: 501 };
let currentPlayer = 1;
let isGameOver = false;

function submitTurn() {
    if (isGameOver) return;

    const input = document.getElementById('turn-score');
    const turnPoints = parseInt(input.value);

    // Validation
    if (isNaN(turnPoints) || turnPoints < 0 || turnPoints > 180) {
        alert("Enter a valid score between 0 and 180.");
        return;
    }

    const currentScore = scores[currentPlayer];
    let nextScore = currentScore - turnPoints;
    let logMessage = `Player ${currentPlayer} threw a ${turnPoints}`;

    if (nextScore === 0) {
        scores[currentPlayer] = 0;
        logMessage += ` -> Checked out! 🎉`;
        updateDOM();
        logTurn(logMessage);
        endGame();
        input.value = '';
        return;
    } else if (nextScore < 2) {
        // Bust rule (must finish on a double, meaning score can't go to 1 or below 0)
        logMessage += ` -> BUST!`;
        alert(`Player ${currentPlayer} Bust!`);
    } else {
        scores[currentPlayer] = nextScore;
        logMessage += ` (Left: ${nextScore})`;
    }

    logTurn(logMessage);
    
    // Switch Players
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    
    updateDOM();
    input.value = '';
    input.focus();
}

function logTurn(message) {
    const historyList = document.getElementById('score-history');
    const newEntry = document.createElement('li');
    newEntry.textContent = message;
    // Insert newest hits at the top of the history list
    historyList.insertBefore(newEntry, historyList.firstChild);
}

function updateDOM() {
    document.getElementById('p1-score').innerText = scores[1];
    document.getElementById('p2-score').innerText = scores[2];
    
    if (!isGameOver) {
        document.getElementById('turn-display').innerText = `Player ${currentPlayer}'s Turn`;
        
        // Update visual highlighting
        document.getElementById('p1-card').classList.toggle('active', currentPlayer === 1);
        document.getElementById('p2-card').classList.toggle('active', currentPlayer === 2);
    }
}

function endGame() {
    isGameOver = true;
    document.getElementById('turn-display').innerText = `🎉 Player ${currentPlayer} Wins!`;
    document.getElementById('p1-card').classList.remove('active');
    document.getElementById('p2-card').classList.remove('active');
}

function resetGame() {
    scores = { 1: 501, 2: 501 };
    currentPlayer = 1;
    isGameOver = false;
    document.getElementById('score-history').innerHTML = '';
    updateDOM();
}
