let buttonColours = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let mulai = false;


$(document).keypress((ss) => {
    if (!mulai) {
        $("#level-title").text("Level " + level);
        nextSequence();
        mulai = true;
    }
})

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length - 1);
})


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart ");
        startOver()
    }

}

function startOver() {
    level = 0;
    mulai = false;
    gamePattern = [];
}

function nextSequence() {
    userClickedPattern = [];
    console.log(userClickedPattern);

    level++;
    $("#level-title").text("Level " + level);

    let randomNUmber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNUmber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


