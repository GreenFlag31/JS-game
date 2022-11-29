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


export {rounds, gameConstants, WinningsRules, category, lifePerCategory}