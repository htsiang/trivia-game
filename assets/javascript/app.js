// declare global variables
var questions = [{question: "Who is Zelda?", answers: ["The Princess of Hyrule", "The Hero of Time", "The character often wearing green", "The King of Hyrule"], imageURL: "zelda.jpg"}, // the correct answer is always the first answer
                {question: "What powerful object does Ganon possess?", answers: ["The Triforce of Power", "The Golden Triumph Forks", "The Triforce of Courage", "The Triforce of Wisdom"], imageURL: "ganon-triforce.jpg"},
                {question: "From where does Ganon typically originate?", answers: ["Gerudo Desert","Death Mountain", "Zora's Domain", "Kakariko Village"], imageURL: "gerudo-desert.jpg"},
                {question: "What is the main currency of Hyrule called?", answers: ["Rupee", "Bokoblin", "Mon", "Lon Lon"], imageURL: "rupees.gif"},
                {question: "Which of the following is not the name of a goddess in the games?", answers: ["Malon", "Din", "Nayru", "Farore"], imageURL: "din-nayru-farore.jpeg"},
                {question: "What is the main blade called?", answers: ["Master Sword", "Skyword Sword", "Fi", "Sacred Sword"], imageURL: "master-sword.gif"},
                {question: "Who among the following is not a sage?", answers: ["Midna", "Rauru", "Darunia", "Nabooru"], imageURL: "seven-sages.jpg"},
                {question: "What race is Link?", answers: ["Hylian", "Human", "Kokiri", "Sheikah"], imageURL: "link.jpg"},
                {question: "What is the Yiga clan's favorite food?", answers: ["Bananas", "Curry Pilaf", "Fruit Cake", "Fish Pie"], imageURL: "yiga-banana.gif"},
                {question: "What is Link's favorite phrase?", answers: ["Hyah!", "Zelda!", "It'sa me, Link!", "Prepare to die."], imageURL: "hyah.jpg"}]
var usedQuestions = []; // store questions already used
var wins = 0; // track # of correctly answered questions
var losses = 0; // track # of incorrectly answered questions
var unanswered = 0; // track # of unanswered questions
var seconds = 30; // number of seconds for question countdown
var questionCountdown; // reference to hold setInterval for 30 second countdown
var timerDisplay; // reference to hold div to display 30 second countdown
var questionDisplay; // reference to hold div to display question
var answer1; // references to hold divs for 4 answer choices
var answer2;
var answer3;
var answer4;
var randomNum; // to store a randomly selected number for question selection
var userAnswer; // store user's answer



// main function that runs when quiz starts
$(document).ready(function() {
    $("#start").click(function() {
        console.log("start");
        $("#start").remove();

        questionSlideshow();
    });
});

// function that start game
function newGame() {
    usedQuestions = []; // reset used questions to nothing
    wins = 0;
    losses = 0;
    unanswered = 0;

    // start question slideshow
    questionSlideshow();
};

// function that goes through questions slideshow
function questionSlideshow() {
    $("#quiz").html("");

    if(usedQuestions.length===questions.length) {
        resultsPage();
    }
    else {
        // dynamically create html elements
        timerDisplay = $("<div>", {id: "timer", text: "Time remaining: 30"});
        questionDisplay = $("<div>", {id: "question"});
        answer1 = $("<div>", {class: "answer", id: "answer1"});
        answer2 = $("<div>", {class: "answer"});
        answer3 = $("<div>", {class: "answer"});
        answer4 = $("<div>", {class: "answer"});    

        // timer counts down
        questionCountdown = setInterval(decrement, 1000);

        // select & display random question
        randomNum = Math.floor(Math.random()*questions.length);
        while (usedQuestions.indexOf(randomNum) >= 0) {
            randomNum = Math.floor(Math.random()*questions.length);
        }
        questionDisplay.text(questions[randomNum].question);

        // mark question as used
        usedQuestions.push(randomNum);

        // should display answers in a random order
        var randomNumArr = [];
        var randomNum2 = Math.floor(Math.random()*4);
        randomNumArr.push(randomNum2);
        while(randomNumArr.length<4) {
            while(randomNumArr.indexOf(randomNum2) >= 0) {
                randomNum2 = Math.floor(Math.random()*4);
            }
            randomNumArr.push(randomNum2);
        };
        console.log(randomNumArr);
        answer1.text(questions[randomNum].answers[randomNumArr[0]]);
        answer2.text(questions[randomNum].answers[randomNumArr[1]]);
        answer3.text(questions[randomNum].answers[randomNumArr[2]]);
        answer4.text(questions[randomNum].answers[randomNumArr[3]]);

        // show elements on document page
        $("#quiz").append(timerDisplay);
        $("#quiz").append(questionDisplay);
        questionDisplay.append(answer1, answer2, answer3, answer4);
        
        // if user clicks on correct answer, register answer as correct
        $(".answer").on("click", function() {
            userAnswer = $(this).text();
            showAnswer();
        });
    };
};

function decrement() {    
    if (seconds === 0) {
        console.log("stop");
        clearInterval(questionCountdown);

        // show answer!
        showAnswer();
    }
    else {
        seconds--;
        timerDisplay.text("Time remaining: " + seconds);
        console.log(seconds);
    };
};

function showAnswer() {
    console.log("showAnswer function worked");

    questionDisplay.text("");

    var message = $("<div>", {class: "message"});
    var correctAnswer = $("<div>", {class: "submessage"});
    var answerImage = $("<img>", {class: "image"});

    // if wrong "Nope" & "the correct answer is: "
    if(seconds===0) {
        message.text("Out of Time!");
        correctAnswer.text("The corect answer is: " + questions[randomNum].answers[0]);
        unanswered++;
    }

    // if out of time "out of time" & "the correct answer is: "
    else if (userAnswer === questions[randomNum].answers[0]) {
        clearInterval(questionCountdown);
        message.text("Correct!");
        wins++;
    }

    // if correct "Correct!" & nothing else
    else {
        clearInterval(questionCountdown);
        message.text("Nope!");
        correctAnswer.text("The correct answer is: " + questions[randomNum].answers[0]);
        losses++;
    };

    answerImage.attr('src', "assets/images/" + questions[randomNum].imageURL);

    $("#quiz").append(message);
    $("#quiz").append(correctAnswer);
    $("#quiz").append(answerImage);

    seconds=30;

    setTimeout(questionSlideshow, 3000);
};

function resultsPage() {
    console.log("results");
    
    var message = $("<div>", {class: "result-message", text: "All done! Here's how you did!"})
    var scores = $("<div>", {class: "results",
                            html: "Correct Answers: " + wins + "<br>Incorrect Answers: " + losses + "<br>Unanswered: " + unanswered})
    var startOver = $("<button>", {id: "start-over", text: "Start Over?"});

    $("#quiz").append(message, scores, startOver);

    startOver.on("click", function() {
        newGame();
    });
};