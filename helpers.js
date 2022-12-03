import { PlayerData } from './Player.js'
import { player, win, playRound, computerPlay } from './game.js'
import { rounds, categorySurname, lifePerCategory, bonusQuestions } from './CONSTANTS.js'


let categoryChoosen = ""
let name = ""
let surname = ""
let previousRatio = 0
let numberOfHearts = ""
let numberOfBonus = ""


function DefineModality() {
  name = prompt('Alright recruit, give me your name :', '')
  if (!name) {
    alert('Alright, you will be called Simone ! 🤓');
    name = 'Simone'
  }
  
  let categorySelection = prompt(`Stand up ${name}, and pick up your difficulty level !\nChoose between : easy - medium - hard`, 'medium')
  categorySelection = FormatField(categorySelection)
  
  surname = categorySurname[categorySelection] ?? "rockstar"
  
  for (const [key, value] of Object.entries(categorySurname)) {
    if (surname === value) {
      categoryChoosen = key
      player.life = lifePerCategory[key]
      break
    }
  }
}


/**
 * @param {string} icon 
 * @param {number} number 
 * @return {string}
 */
function DisplayIcons(icon, number) {
  let numberOfIcons = ""

  for (let i = 0; i < number; i++) {
    numberOfIcons += icon
  }

  return numberOfIcons
}


function DetermineIconsAndNumber() {
  if (player.life > 0) {
    numberOfHearts = DisplayIcons("❤️", player.life)
  } else {
    numberOfHearts = '💀'
  }

  if (player.bonus > 0) {
    numberOfBonus = DisplayIcons("⭐️", player.bonus)
  } else if (player.bonus < 0) {
    numberOfBonus = DisplayIcons("👎", -player.bonus)
  } else {
    numberOfBonus = 0
  }
}


 /**
  * @param {string} field 
  * @return {string | undefined} In case the user stops the execution (leaving)
  */
function FormatField(field) {
  return field?.toLowerCase().replace(/\s|\W|[0-9]/g, '') ?? undefined
}


/** @param {string} playerSelection */
function DisplayResultInConsole(playerSelection) {
  let scoreStatus = ""
  let color

  console.log(playRound(playerSelection, computerPlay()))

  if (win / rounds > previousRatio) {
    scoreStatus = "changed"
    color = "green"
  } else {
    scoreStatus = "unchanged"
    color = "red"
  }

  previousRatio = win / rounds
  console.log(`Score %c${scoreStatus} %c: ${win} / ${rounds}`, `color: ${color}`, `color: white`)
}


/** 
 * A check has to be done during game but also endgame, player might lose at last round
 * @return {boolean}
 */
function CheckIfPlayerIsStillAlive() {
  if (!player.alive()) {
    console.log(`%cThey who for their country die,\nshall fill an honored grave.\nFor glory lights the soldier's tomb,\nand beauty weeps the brave.
    \n\nJoseph Rodman Drake`, 'color: red');
    DetermineIconsAndNumber()
    new PlayerData(name, 0, 0, 0, categoryChoosen)
    console.log('%cStart a new game by typing "game()" in the console', 'color: #17d136')
    return false
  }

  return true
}


/**
 * @param {string} word 
 * @return {string}
 */
function Capitalize(word) {
  return word[0].toUpperCase() + word.substring(1)
}

/** @return {number} */
function PickRandomQuestion() {
  const questions = Object.keys(bonusQuestions)
  const randomNumber = Math.floor(Math.random() * questions.length)

  return questions[randomNumber]
}


function DisplayBonusQuestion() {
  // Not displaying bonus question for every question
  if (Math.random() + 0.2 < 0.5) return


  const randomQuestion = PickRandomQuestion()
  const instructionIfBooleanResponse = bonusQuestions[randomQuestion] === true || false ? 'Type true of false :' : ''
  let bonusQuestion = prompt(`Bonus question ! ${instructionIfBooleanResponse}
  \n\n${randomQuestion}`)
  bonusQuestion = FormatField(bonusQuestion)

  ValidateBonusQuestion(bonusQuestion, randomQuestion)
}


function ValidateBonusQuestion(bonusQuestion, randomQuestion) {
  if (bonusQuestion === bonusQuestions[randomQuestion].toString()) {
    player.addBonus()
  } else if (categoryChoosen === 'hard') {
    player.substractBonus()
  }
}
  

export { DisplayIcons, FormatField, DisplayResultInConsole, Capitalize, DefineModality, name, surname, categoryChoosen, DisplayBonusQuestion, CheckIfPlayerIsStillAlive, numberOfHearts, numberOfBonus, DetermineIconsAndNumber }