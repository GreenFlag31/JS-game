


const gameConstants = ['rock', 'paper', 'scissors']
const [rock, paper, scissors] = gameConstants
let win = 0

const WinningsRules = {
  rock: scissors,
  paper: rock,
  scissors: paper
}

function computerPlay() {
  return gameConstants[Math.floor(Math.random() * gameConstants.length)]
}

function playRound(playerSelection, computerSelection) {
  
  if (computerSelection === WinningsRules[playerSelection]) {
    win++
    return `${Capitalize(playerSelection)} beats ${Capitalize(WinningsRules[playerSelection])}, you won.\nHow dare you ! I will break your code soon or later !`
  } else if (playerSelection === computerSelection) {
    return `Too bad, draw. You picked up the same value !\nA programmer is like a Samurai. Try to think like the computer is thinking.`
  } else {
    return `Hehehe. You lost ! ${Capitalize(WinningsRules[playerSelection])} beats ${Capitalize(playerSelection)}`
  }
}

const ROUNDS = 5
let penalty = 0
function game() {
  let i = 5
  
  while (i) {
    let playerSelection = prompt('Alright Warrior, let\'s start the game !', 'paper')
    if (playerSelection === null) {
      console.log('A true warrior does not leave the battlefield without fighting');
      return
    } 

    playerSelection = playerSelection.toLowerCase().replace(/\s|\W|[0-9]/g, '')
    if (penalty <= -3) {
      console.log('I sentence you to programm with Notepad++ and Internet Explorer for the rest of your life !!!');
      return
    } else if (!gameConstants.includes(playerSelection)) {
      penalty--
      i--
      console.log('%cInvalid input. %cFor your punishment, you lost a victory.', 'color: red', 'color: white')
      game()
      return
    }

    DisplayResultInConsole(playerSelection)
    i--
  }


  console.log(`Total score : ${win} / ${ROUNDS}`)
}


let previousRatio = 0
function DisplayResultInConsole(playerSelection) {
  let scoreStatus = ""
  let color

  console.log(playRound(playerSelection, computerPlay()))

  if (win / ROUNDS > previousRatio) {
    scoreStatus = "changed"
    color = "green"
  } else {
    scoreStatus = "unchanged"
    color = "red"
  }

  previousRatio = win / ROUNDS
  console.log(`Score %c${scoreStatus} %c: ${win} / ${ROUNDS}`, `color: ${color}`, `color: white`)
}



 
function Capitalize(word) {
  return word[0].toUpperCase() + word.substring(1)
}



game()

// Easy, medium, hard, extra-hard
// normal, regex, 3 lifes, min-points