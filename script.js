let scores = { 1: 501, 2: 501 };
let dartCounts = { 1: 0, 2: 0 };
let currentPlayer = 1;
let isGameOver = false;

function submitTurn() {
    if (isGameOver) return;

    const input = document.getElementById('turn-score');
    const turnPoints = parseInt(input.value);

    if (isNaN(turnPoints) || turnPoints < 0 || turnPoints > 180) {
        alert("Enter a valid score between 0 and 180.");
        return;
    }

    // Increment dart count for current player by 3 darts
    dartCounts[currentPlayer] += 3;

    const currentScore = scores[currentPlayer];
    let nextScore = currentScore - turnPoints;
    let scoreDisplay = turnPoints.toString();
    let leftDisplay = "";
    let isBust = false;

    if (nextScore === 0) {
        scores[currentPlayer] = 0;
        leftDisplay = "🎉 0";
        appendRow(currentPlayer, dartCounts[currentPlayer], scoreDisplay, leftDisplay, isBust);
        endGame();
        input.value = '';
        return;
    } else if (nextScore < 2) {
        isBust = true;
        scoreDisplay = "BUST";
        leftDisplay = currentScore;
        alert(`Player ${currentPlayer} Bust!`);
    } else {
        scores[currentPlayer] = nextScore;
        leftDisplay = nextScore;
    }

    appendRow(currentPlayer, dartCounts[currentPlayer], scoreDisplay, leftDisplay, isBust);
    
    // Switch active turns
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    
    updateDOM();
    input.value = '';
    input.focus();
}

function appendRow(playerNum, totalDarts, scoreThrown, scoreLeft, isBust) {
    const tableBody = document.getElementById(`p${playerNum}-history`);
    const row = document.createElement('tr');

    const dartsCell = document.createElement('td');
    dartsCell.textContent = totalDarts;

    const scoreCell = document.createElement('td');
    scoreCell.textContent = scoreThrown;
    if (isBust) {
        scoreCell.classList.add('text-bust');
    }

    const leftCell = document.createElement('td');
    leftCell.textContent = scoreLeft;

    row.appendChild(dartsCell);
    row.appendChild(scoreCell);
    row.appendChild(leftCell);

    // This inserts the newest throws at the very top of the table logs
    tableBody.insertBefore(row, tableBody.firstChild);
}

function updateDOM() {
    document.getElementById('p1-score').innerText = scores[1];
    document.getElementById('p2-score').innerText = scores[2];
    
    if (!isGameOver) {
        document.getElementById('turn-display').innerText = `Player ${currentPlayer}'s Turn`;
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
    dartCounts = { 1: 0, 2: 0 };
    currentPlayer = 1;
    isGameOver = false;
    document.getElementById('p1-history').innerHTML = '';
    document.getElementById('p2-history').innerHTML = '';
    updateDOM();
}

