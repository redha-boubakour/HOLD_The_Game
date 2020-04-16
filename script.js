var scores, currentScore, activePlayer, gamePlaying, previousDice, winningScore;

init();

document.querySelector(".btn-rollDice").addEventListener("click", function () {
  if (gamePlaying) {
    // Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.visibility = "";
    diceDOM.src = `dice/dice-${dice}.png`;

    // Update the current score IF the rolled number isnt a 1
    if (dice !== 1) {
      // Add the score
      currentScore += dice;
      document.querySelector(
        `#currentScore-${activePlayer}`
      ).textContent = currentScore;
      if (previousDice === 6 && dice === 6) {
        // (If there is TWO six in a row)
        scores[activePlayer] = 0;
        document.querySelector(`#finalScore-${activePlayer}`).textContent = 0;
        nextPlayer();
      }
      previousDice = dice;
    } else {
      // Next player's
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    winningScore = 20;
    // Add the current score to the final score
    scores[activePlayer] += currentScore;

    // Update the UI
    document.querySelector(`#finalScore-${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if one of the two players won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector(`#name-${activePlayer}`).textContent =
        "THE WINNER !";

      document.querySelector(".dice").style.visibility = "hidden";

      document.querySelector(`.player-${activePlayer}`).classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-newGame").addEventListener("click", init);

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  currentScore = 0;

  document.getElementById("currentScore-0").textContent = "0";
  document.getElementById("currentScore-1").textContent = "0";

  document.querySelector(".player-0").classList.toggle("active");
  document.querySelector(".player-1").classList.toggle("active");

  document.querySelector(".dice").style.visibility = "hidden";
}

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.visibility = "hidden";

  document.getElementById("finalScore-0").textContent = "0";
  document.getElementById("finalScore-1").textContent = "0";
  document.getElementById("currentScore-0").textContent = "0";
  document.getElementById("currentScore-1").textContent = "0";

  document.querySelector(`#name-0`).textContent = "PLAYER 1";
  document.querySelector(`#name-1`).textContent = "PLAYER 2";

  document.querySelector(`.player-0`).classList.remove("winner");
  document.querySelector(`.player-1`).classList.remove("winner");

  document.querySelector(`.player-0`).classList.remove("active");
  document.querySelector(`.player-1`).classList.remove("active");
  document.querySelector(`.player-0`).classList.add("active");
}
