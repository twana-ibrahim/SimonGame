var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// hold user clicked 
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

//increase level, get ID of the button, hold the sequence
function nextSequence(){
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var buttonId = "#"+ randomChosenColor;
    $(buttonId).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

//play sound when clicke
function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

//the button animate as flash 
function animatePress(currentColor){
    $("."+ currentColor).addClass("pressed");

    setTimeout(function(){
        $("."+ currentColor).removeClass("pressed");
    }, 100)
}

//press any key on the page to start the game
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});

//check the answer if the user sequence is correct or not
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }
    }
    else{
        $("#level-title").text("Game Over, Press Any Key to Restart");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }
}

//when the user click on a wrong button, the game is end, they must start over
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}