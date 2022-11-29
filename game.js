import Player from './Player.js'
import { rounds, gameConstants, WinningsRules, category, lifePerCategory, categorySurname } from './CONSTANTS.js'
import { DisplayHeartsLife, FormatField, DisplayResultInConsole, Capitalize } from './helpers.js'


let win = 0
let previousRatio = 0
let categoryChoosen = ""
const player = new Player()



function computerPlay() {
  return gameConstants[Math.floor(Math.random() * gameConstants.length)]
}

function playRound(playerSelection, computerSelection) {
  
  if (computerSelection === WinningsRules[playerSelection]) {
    win++
    return `${Capitalize(playerSelection)} beats ${Capitalize(WinningsRules[playerSelection])}, you won.
    \nHow dare you ! I will break your code soon or later !`
  } else if (playerSelection === computerSelection) {
    return `Too bad, draw. You picked up the same value !
    \nA programmer is like a Samurai. Try to think like the computer is thinking.`
  } else {
    player.DecrementLife()
    return `Hehehe. You lost ! ${Capitalize(WinningsRules[playerSelection])} beats ${Capitalize(playerSelection)}
    \nRemaining life${lifePerCategory[categoryChoosen] > 1 ? 's' : ''} : ${DisplayHeartsLife()}`
  }

}



window.game = () => {
  let categorySelection = prompt('Stand up soldier, and pick up your difficulty level !\nChoose between : easy - medium - hard')
  categorySelection = FormatField(categorySelection)

  let surname = categorySurname[categorySelection] ?? "rockstar"

  
  for (const [key, value] in categorySurname) {
    if (surname === value) {
      categoryChoosen = key
      player.life = lifePerCategory[key]
      break
    }
  }


  let i = 5
  while (i) {
    if (!player.Alive()) {
      console.log(`%cThey who for their country die,\nshall fill an honored grave.\nFor glory lights the soldier's tomb,\and beauty weeps the brave.
      \n\nJoseph Rodman Drake`, 'color: red');
      return
    }

    let playerSelection = prompt(`Alright ${surname}, let\'s start the game !\nChoose between : paper - scissors - rock`, 'paper')
    if (playerSelection === null) {
      console.log('A true warrior does not leave the battlefield without fighting!');
      return
    } 

    playerSelection = FormatField(playerSelection)
    if (!gameConstants.includes(playerSelection)) {
      console.log('%cInvalid input', 'color: red')
      game()
      return
    }

    DisplayResultInConsole(playerSelection)
    i--
  }
  
  
  console.log(`Total score : ${win} / ${rounds}`)
  previousRatio = 0
}




console.log('%cStart a game by typing "game()" in the console', 'color: #17d136')
// Easy, medium, hard, extra-hard
// ask for the name
// display ranking console.table
// normal, 3 lifes, regex, min-points