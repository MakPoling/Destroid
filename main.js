// Wait for the page to load before executing any code
window.addEventListener("load", (event) => {
  // Prompt user for name
  let userInput = prompt("Enter your name:");
  let userName = userInput;

  // Display a welcome message to the user
  document.getElementById("player_welcome").innerHTML = `Are you ready to destroy some asteroids, ${userName}?`;
});

$(document).ready(function () {
  let score = 0;
  let time = 30;
  let gameSpaceWidth, gameSpaceHeight;
  let asteroidInterval, timerInterval;

  // Get the size of the game space
  function getGameSpaceSize() {
    gameSpaceWidth = $("#gamespace").width();
    gameSpaceHeight = $("#gamespace").height();
  }

  // Increment the player's score and update the score
  function incrementScore() {
    score++;
    $("#score").text("Score: " + score + (score === 1 ? " pt" : " pts"));
  }

// Decrement the remaining time and handle game over
function decrementTime() {
  $("#timer").text("Time remaining: " + time + " seconds");
  if (time < 0) {
    stopGame();
    // Show an alert with the player's score when the game ends
    alert("Game Over!\nYour Score: " + score + " pts");
  } else {
    time--;
  }
}

  // Add a new asteroid image at a random position
  function addImage() {
    let imageSrc = "img/pngimg.com - asteroid_PNG17.png";
    let x = xPositioning(gameSpaceWidth - 120);
    let y = yPositioning(gameSpaceHeight - 120);
    let asteroidElement = $(`<img src="${imageSrc}" class="asteroid" alt="asteroid" style="position: absolute; left: ${x}px; top: ${y}px;">`);
    $("#gamespace").append(asteroidElement);

    let visibilityDuration = getRandomInterval(1000, 3000);

    // Remove the asteroid after the visibility duration
    setTimeout(() => {
      asteroidElement.remove();
    }, visibilityDuration);
  }


  // Generate random y position for an asteroid
  function yPositioning(gamespaceHeight) {
    return Math.floor(Math.random() * (gamespaceHeight - 120));
  }

  // Generate random x position for an asteroid
  function xPositioning(gamespaceWidth) {
    return Math.floor(Math.random() * (gamespaceWidth - 120));
  }

  // Generate random interval between min and max values
  function getRandomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Start the game
  function startGame() {
    score = 0;
    time = 30;
    getGameSpaceSize();
    addImage();
    asteroidInterval = setInterval(addImage, getRandomInterval(500, 3000));
    timerInterval = setInterval(decrementTime, 1000);
    $("#timer").show();
    $("#start_button").prop("disabled", true);
  }

  // Stop the game and reset intervals
  function stopGame() {
    clearInterval(asteroidInterval);
    clearInterval(timerInterval);
    $(".asteroid").remove();
    $("#timer").hide();
    $("#start_button").prop("disabled", false);

  }

  function resetGame() {
    score = 0;
    $("#score").text("Score: 0 pts");
    stopGame();
  }

  resetGame();


  // Start or stop game when start button is clicked
  $("#start_button").click(function () {
    stopGame();
    startGame();
  });

  // Styling for the start button
  $("#start_button").css({
    width: "75px",
    height: "50px",
    fontSize: "18px",
    backgroundColor: "#fcc3a4",
    color: "black",
  });

  // Start button hover effect
  $("#start_button").hover(
    function () {
      $(this).css("background-color", "green");
    },
    function () {
      $(this).css("background-color", "#fcc3a4");
    }
  );

  // Remove clicked asteroids and increment score
  $("#gamespace").on("click", ".asteroid", function () {
    $(this).remove(); // Remove the clicked asteroid
    incrementScore();
  });

  // Show initial time at 30 secs when start is clicked
  $("#timer").text("Time remaining: " + time + " seconds");
});
