var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
let userClickedPattern = [];

var randomNumber;
var started = false;
var level = 0;
$("body").on("keydown", function(event) {
    if (!started) {
        $("h1").text("level " + level);
        nextSequence();
        started = true;
    }

});

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

});



function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");


        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 1000)
        $("h1").text("game over, press any key to restart");
        startOver();
        // $("body").on("keydown", function() {
        //     started = false;
        //     level = 0;
        //     $("h1").text("level " + level);
        // })
    }

}

function nextSequence() {

    userClickedPattern = [];
    level++;

    $("h1").text("level " + level);


    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    console.log(gamePattern);
    playSound(randomChosenColor);


}




function playSound(name) {
    var audio = new Audio("/sounds/" + name + ".mp3");
    audio.play();

}


function animatePress() {
    $(".btn").on("click", function() {
        $(this).addClass("pressed");
        setTimeout(function() {
            $(".btn").removeClass("pressed");
        }, 100);
    })
}


function startOver() {
    level = 0;
    // for (var i = 0; i < gamePattern.length; i++) {
    //     gamePattern.pop(i);
    // }

    gamePattern = [];
    started = false;

}