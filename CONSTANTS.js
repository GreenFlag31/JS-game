// import { DefineModality } from "./helpers.js"

const rounds = 5
const gameConstants = ['rock', 'paper', 'scissors']
const [rock, paper, scissors] = gameConstants

const WinningsRules = {
  rock: scissors,
  paper: rock,
  scissors: paper
}

const category = ['easy', 'medium', 'hard']
const [easy, medium, hard] = category
const lifePerCategory = {
  easy: 5,
  medium: 4,
  hard: 3
}


const categorySurname = {
  easy: "chick",
  medium: "soldier",
  hard: "rockstar"
}

const bonusQuestions = {
  "My name contains 2 programming languages.\nMy father has given me the V8 engine.\nMy sister likes to do everything more strict than me. What is her name?" : "typescript",

  "If the same id is used multiple times in the DOM, Google Chrome is going to raise warnings in the console" : true,

  "Following code will make the id disappear :\n#titanic : {\n  float: none;\n}" : false,
  
  "If the keyword 'function' is used, this function is going to be hoisted at the top of the file" : true,

  "Following code is a good alternative to display: flex; :\n#ikea : {\n  display: table;\n}" : false,

  "(2b || !2b) comes from William Shakespeare" : true,

  "The main flaw of using 'var' for defining a variable is that it had a global scope and tolerated redeclarations" : true,

  


}

// name, life, bonus, win, category
// need a DataBase :)
window.RANKING = []


export { rounds, gameConstants, WinningsRules, category, lifePerCategory, categorySurname }