// alert("Welcome to Simon game!");

//creating array of colors
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = []; //store the colours user clicked

//to keep track if game has started, so only call nextSequence() on the first keypress
var started = false;

//new global variable and start from level 0
var level = 0;

//put parentheses behind nextSequence() function so that 
//the keypress will start the function when a keyboard key has been pressed for 
//the first time. 
$(document).keypress(function(){
    if(!started) {
        // var headerText =$("#level-title").text();
        $("#level-title").text("Level " + level);

        nextSequence();
        started = true;
    }
});

//detect any of the colours are clicked and trigger the function
$(".btn").click(function() {
    //store id of the button that got clicked
    //.attr() will get the value of an attribute for the first element in the set of 
    //matched elements. id represents the colours
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    //call checkAnswer() function after user has clicked and chosen their answer
    //passing in the index of the last answer in the user's sequence.
    var userLastChoiceIndex =  userClickedPattern.length-1;
    checkAnswer(userLastChoiceIndex);
    // console.log(userClickedPattern);
});


//this function is to:
//change h1 header
//generate random colour and push to gamePattern array
//start and go to next level
function nextSequence() {
    //reset userCLickedPattern once nextSequence() is triggered
    userClickedPattern = [];


    //increase level by 1 everytime this function is called
    level++;
    // var headerText =$("#level-title").text();

    //update h1 with the change of in the value of the level
    $("#level-title").text("Level " + level);


    //multiply by 4 to achieve random number from 0 to 3
    //note** there are 4 elements in the array
    var randomNumber = Math.random()*4;
    randomNumber = Math.floor(randomNumber);

    //store the random element chosen from randomNumber and store in array
    //then push it to the new empty array
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //animate flash

    playSound(randomChosenColour);
};



function playSound(name) {
    //use jquery to select button with same id as randomChosenColour
    // $("#" + name).on("click", function() {
    //     var audio = new Audio("sounds/"+ name + ".mp3");
    //     audio.play();
    // });

    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    var headerColour = $("#"+currentColour);
    headerColour.addClass("pressed");

    setTimeout(function() {
        headerColour.removeClass("pressed");
    }, 100);
}

//currentLevel is showing the last element index of userClickedPattern array
function checkAnswer(currentLevel) {
    //check if last element in gamePattern array is equal to last element in userClickedPattern array
    //it is the most recent input of both array
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("success");
        
        //if match, call nextSequence() after 1000ms
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("fail");
        var failAudio = new Audio("sounds/wrong.mp3");
        failAudio.play();
        $(document.body).addClass("game-over");
        setTimeout(function() {
            $(document.body).removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}