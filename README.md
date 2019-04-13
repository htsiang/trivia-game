# trivia-game
Homework assigned 2019.04.06; due 2019.04.13

A trivia game for Legend of Zelda franchise.
Each question has a time limit of 30 seconds. The answer displays for 3 seconds.
There are 10 questions in the game currently, and each game runs through all 10 questions in a random order.

**Adding more questions to the trivia**
* To add more questions, just add another object to the questions array defined at the top of the app.js file.
* format the question object as follows:
    {questions: "", answers: ["answer 1 should be the correct answer", "answer 2", "answer 3", "answer 4: 2-4 should all be wrong answers"], imageURL: "file name"}
* for the imageURL, the file name should include the file type (eg: .jpg or .png) and the file should be placed in the assets/images folder