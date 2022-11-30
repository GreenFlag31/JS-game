import { Player, PlayerData } from './Player.js'
import { gameConstants, WinningsRules } from './CONSTANTS.js'
import { DefineModality, DisplayHeartsLife, FormatField, DisplayResultInConsole, Capitalize, name, surname, categoryChoosen } from './helpers.js'


let win = 0
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
    \nRemaining life${player.life > 1 ? 's' : ''} : ${DisplayHeartsLife().join()}`
  }

}



window.game = () => {
  DefineModality()


  let i = 5
  while (i) {
    if (!player.Alive()) {
      console.log(`%cThey who for their country die,\nshall fill an honored grave.\nFor glory lights the soldier's tomb,\nand beauty weeps the brave.
      \n\nJoseph Rodman Drake`, 'color: red');
      new PlayerData(name, 0, 0, 0, "💀💀💀")
      console.table(window.RANKING)
      return
    }

    let playerSelection = prompt(`Alright ${surname}, let\'s start the game !\n\nChoose between : paper - scissors - rock`, 'paper')
    if (playerSelection === null) {
      console.log('A true warrior does not leave the battlefield without fighting!\nPenalty of 3');
      new PlayerData(name, [], [], 0, "🐣🐣🐣", 3)
      console.table(window.RANKING)
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
  
  
  new PlayerData(name, player.life, 2, win, categoryChoosen)
  console.log('\n%c ACTUAL RANKING : \n', 'color: pink; font-weight: 900; font-size; 1.2em')
  console.table(window.RANKING)
  console.log('%cStart a new game by typing "game()" in the console', 'color: #17d136')
  win = 0
}



console.log('%cStart a game by typing "game()" in the console', 'color: #17d136')

export { win, player, playRound, computerPlay }