import { Player, PlayerData } from './Player.js'
import { gameConstants, WinningsRules } from './CONSTANTS.js'
import { DefineModality, DisplayIcons, FormatField, DisplayResultInConsole, Capitalize, name, surname, categoryChoosen, DisplayBonusQuestion, CheckIfPlayerIsStillAlive, DetermineIconsAndNumber } from './helpers.js'


let win = 0
const player = new Player()


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
    const numberOfHearts = player.life > 0 ? DisplayIcons("❤️", player.life) : '💀'
    return `Hehehe. You lost ! ${Capitalize(WinningsRules[playerSelection])} beats ${Capitalize(playerSelection)}
    \nRemaining life${player.life > 1 ? 's' : ''} : ${numberOfHearts}`
  }

}




/** @return {void} */
window.game = () => {
  DefineModality()

  let i = 5
  while (i) {
    if (!CheckIfPlayerIsStillAlive()) return

    let playerSelection = prompt(`Alright ${surname}, let\'s ${i === 5 ? 'start' : 'continue'} the game !\n\nChoose between : paper - scissors - rock`, 'scissors')
    if (playerSelection === null) {
      console.log('A true warrior does not leave the battlefield without fighting!\nPenalty of 3, bonus -1');
      player.substractBonus()
      DetermineIconsAndNumber()
      new PlayerData(name, player.life, player.bonus, win, "🐣🐣🐣", 3)
      return
    } 
    
    playerSelection = FormatField(playerSelection)
    if (!gameConstants.includes(playerSelection)) {
      console.log('%cInvalid input', 'color: red')
      game()
      return
    }
    
    DisplayResultInConsole(playerSelection)
    DisplayBonusQuestion()
    i--
  }

  if (!CheckIfPlayerIsStillAlive()) return
  

  DetermineIconsAndNumber()
  new PlayerData(name, player.life, player.bonus, win, categoryChoosen)

  console.log('%cStart a new game by typing "game()" in the console', 'color: #17d136; font-weight: bold; font-size: 1.1em')
  win = 0
  player.bonus = 0
}




let instructionResetStorage = ""
if (sessionStorage.getItem('record-0')) {
  instructionResetStorage = ' || Reset progress by typing "sessionStorage.clear()" in the console'
}
console.log(`%cStart a game by typing "game()"${instructionResetStorage}`, 'color: #17d136; font-weight: bold; font-size: 1.1em')

export { win, player, playRound, computerPlay }