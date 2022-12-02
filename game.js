import { Player, PlayerData } from './Player.js'
import { gameConstants, WinningsRules } from './CONSTANTS.js'
import { DefineModality, DisplayIcons, FormatField, DisplayResultInConsole, Capitalize, name, surname, categoryChoosen, DisplayBonusQuestion } from './helpers.js'


let win = 0
const player = new Player()
let numberOfHearts = ""
let numberOfBonus = ""


/** @return {number} */
function computerPlay() {
  return gameConstants[Math.floor(Math.random() * gameConstants.length)]
}

/**
 * @param {string} playerSelection 
 * @param {string} computerSelection 
 * @return {string}
 */
function playRound(playerSelection, computerSelection) {
  
  if (computerSelection === WinningsRules[playerSelection]) {
    win++
    return `${Capitalize(playerSelection)} beats ${Capitalize(WinningsRules[playerSelection])}, you won.
    \nHow dare you ! I will break your code soon or later !`
  } else if (playerSelection === computerSelection) {
    return `Too bad, draw. You picked up the same value !
    \nA programmer is like a Samurai with his sword. Try to think like the computer is thinking.`
  } else {
    player.decrementLife()
    numberOfHearts = DisplayIcons("❤️", player.life)
    return `Hehehe. You lost ! ${Capitalize(WinningsRules[playerSelection])} beats ${Capitalize(playerSelection)}
    \nRemaining life${player.life > 1 ? 's' : ''} : ${numberOfHearts}`
  }

}


/** @return {void} */
window.game = () => {
  DefineModality()

  let i = 5
  while (i) {
    if (!player.alive()) {
      console.log(`%cThey who for their country die,\nshall fill an honored grave.\nFor glory lights the soldier's tomb,\nand beauty weeps the brave.
      \n\nJoseph Rodman Drake`, 'color: red');
      player.bonus = 0
      win = 0
      new PlayerData(name, player.life, player.bonus, win, categoryChoosen)
      return
    }

    let playerSelection = prompt(`Alright ${surname}, let\'s ${i === 5 ? 'start' : 'continue'} the game !\n\nChoose between : paper - scissors - rock`, 'paper')
    if (playerSelection === null) {
      console.log('A true warrior does not leave the battlefield without fighting!\nPenalty of 3, bonus -1');
      debugger
      player.substractBonus()
      new PlayerData(name, player.life, player.bonus, win, "🐣🐣🐣", 3)
      return
    } 
    
    playerSelection = FormatField(playerSelection)
    if (!gameConstants.includes(playerSelection)) {
      console.log('%cInvalid input', 'color: red')
      game()
      return
    }
    
    DisplayBonusQuestion()
    DisplayResultInConsole(playerSelection)
    i--
  }
  
  numberOfHearts = DisplayIcons("❤️", player.life)
  numberOfBonus = DisplayIcons("⭐️", player.bonus)
  new PlayerData(name, player.life, player.bonus, win, categoryChoosen)

  console.log('%cStart a new game by typing "game()" in the console', 'color: #17d136')
  win = 0
}


let instructionResetStorage = ""
if (sessionStorage.getItem('record-0')) {
  instructionResetStorage = ' || Reset progress by typing "sessionStorage.clear()" in the console'
}
console.log(`%cStart a game by typing "game()"${instructionResetStorage}`, 'color: #17d136; font-weight: bold; font-size: 1.1em')

export { win, player, playRound, computerPlay, numberOfHearts, numberOfBonus }