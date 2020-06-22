var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keydown(function() {
  if (started == false) {
    $("#level-title").text("Level 0");
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var buttonChoice = $("#" + randomChosenColour);
  buttonChoice.fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}


$(".btn").click(function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");
    console.log(gamePattern);
    console.log(userClickedPattern);
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    // console.log("failure");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
