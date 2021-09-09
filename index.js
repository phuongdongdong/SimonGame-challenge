var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keydown(function(){
  //start game
  if ($("h1").text() == "Press A Key to Start"){
    nextSequence();
  }
  //game over, restart
  if ($("h1").text() == "Game Over, Press Any Key to Restart"){
    startOver();
    nextSequence();
  }

  // else: ignore keypress
});

//when player click on button
$(".btn").on("click",handleClick);


function nextSequence(){
  // create random pattern
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // add animation to the button
  var selectedButton = $("#"+randomChosenColour);
  selectedButton.fadeOut("fast");
  selectedButton.fadeIn("fast");

  // add sound to the button
  playSound(randomChosenColour);

  //notify the level
  $("h1").text("Level " + level);

  //get to next level
  level += 1;

  //clear the last clicked pattern
  userClickedPattern = [];
}

function playSound(name){
  var soundFile = new Audio("sounds/" + name + ".mp3");
  soundFile.play();
}

function animationPress(currentColour){
  var activeButton = $("." + currentColour);
  activeButton.addClass("pressed");
  setTimeout(function(){
    activeButton.removeClass("pressed");
  }, 100);
}


function handleClick(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animationPress(userChosenColour);

  //check if user's click was correct
  var checkThisClick = checkAnswer(userClickedPattern.length-1);
  if (checkThisClick === true){
    //if full pattern, move to next level
    if (userClickedPattern.length === level)
      setTimeout(nextSequence,500);
  }
  else {
    gameOver();
  }
}

function gameOver(){
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("h1").text("Game Over, Press Any Key to Restart");
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

function checkAnswer(currentLevel){ //currentLevel = i
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel])
    return true;
  else
    return false;
}
