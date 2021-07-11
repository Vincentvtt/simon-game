let userClickedPattern = [];
let gamePattern = [];
let gameStarted = false;
let level = 0;

$(document).keypress(function () {
  if (gameStarted === false) {
    $("#level-title").text("Level 0");
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").click(function () {
  const userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSoundEffect(userChosenColour);
  animatePress($(this));
  checkAnswer(userClickedPattern.length - 1);
});

const checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    const sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    return;
  }

  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(() => {
      nextSequence();
      userClickedPattern = [];
    }, 1000);
  }
};

const nextSequence = () => {
  const randomChosenColour = getRandomColour();
  gamePattern.push(randomChosenColour);
  flashEffect($("#" + randomChosenColour));
  playSoundEffect(randomChosenColour);
  $("#level-title").text("Level " + ++level);
};

// Helper functions

const startOver = () => {
    userClickedPattern = [];
    gamePattern = [];
    gameStarted = false;
    level = 0;
  };

const getRandomColour = () => {
  const buttonColours = ["red", "blue", "green", "yellow"];
  const randomNumber = Math.floor(Math.random() * 4);
  return buttonColours[randomNumber];
};

const flashEffect = (element) => {
  element.fadeOut(100).fadeIn(100);
};

const playSoundEffect = (colour) => {
  const sound = new Audio("sounds/" + colour + ".mp3");
  sound.play();
};

const animatePress = (currentColour) => {
  currentColour.addClass("pressed");
  setTimeout(() => {
    currentColour.removeClass("pressed");
  }, 100);
};