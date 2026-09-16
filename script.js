let currentScore = 501;

function subtractScore() {
    const input = document.getElementById('turn-score');
    const turnPoints = parseInt(input.value);

    if (isNaN(turnPoints) || turnPoints < 0 || turnPoints > 180) {
        alert("Please enter a valid 3-dart score between 0 and 180.");
        return;
    }

    if (currentScore - turnPoints === 0) {
        currentScore = 0;
        document.getElementById('score').innerText = "Winner! 🎉";
        alert("Game Shot and the Match!");
    } else if (currentScore - turnPoints < 2) {
        alert("Bust! Score remains " + currentScore);
    } else {
        currentScore -= turnPoints;
        document.getElementById('score').innerText = currentScore;
    }
    input.value = '';
}

function resetGame() {
    currentScore = 501;
    document.getElementById('score').innerText = currentScore;
}
