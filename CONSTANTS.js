const rounds = 5
const gameConstants = ['rock', 'paper', 'scissors']
const [rock, paper, scissors] = gameConstants

const WinningsRules = {
  rock: scissors,
  paper: rock,
  scissors: paper
}

const category = ['easy', 'medium', 'hard']
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

const bonusQuestions =  {
  "My name contains 2 programming languages.\nMy father has given me the V8 engine.\nMy sister likes to do everything more strict than me. What is her name?" : "typescript",

  "To use several times the same id in the DOM is considered as a good practice" : false,

  "Following code will make the id disappear :\n#titanic : {\n  float: none;\n}" : false,
  
  "If the keyword 'function' is used, this function is going to be hoisted (pulled up) at the top of the file" : true,

  "Following code is a good alternative to display: flex; :\n#ikea : {\n  display: table;\n}" : false,

  "(2b || !2b) comes from William Shakespeare" : true,

  "The main flaw of using 'var' for defining a variable is that it has a global scope and tolerates redeclarations" : true,

  "There are 7 primitive types: string, number, bigint, boolean, symbol, null and undefined" : true,
  // https://developer.mozilla.org/en-US/docs/Glossary/Primitive

  "To create a new array, we should always prefer the 'new array( )' syntax" : false,

  "if you compare two values, '==' will make an implicite type conversion" : true,

  "Javascript and Ecmascript are two differents things" : false,

  "A developer could be considered full-stack with Javascript" : true,

  "ES6 has introducted a major update for Javascript in 2015" : true
}


export { rounds, gameConstants, WinningsRules, category, lifePerCategory, categorySurname, bonusQuestions }