import { player, win, playRound, computerPlay } from './game.js'
import { rounds, categorySurname, lifePerCategory, bonusQuestions } from './CONSTANTS.js'


let categoryChoosen = ""
let name = ""
let surname = ""
let previousRatio = 0

function DefineModality() {
  name = prompt('Alright recruit, give me your name :', '')
  if (!name) {
    alert('Alright, you will be called Simone ! 🤓');
    name = 'Simone'
  }
  
  let categorySelection = prompt(`Stand up ${name}, and pick up your difficulty level !\nChoose between : easy - medium - hard`, 'easy')
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

function DisplayIcons(icon, number) {
  let numberOfHearts = ""

  for (let i = 0; i < number; i++) {
    numberOfHearts += icon
  }

  return numberOfHearts
}

function FormatField(field) {
  return field?.toLowerCase().replace(/\s|\W|[0-9]/g, '') ?? undefined
}

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
  console.log(`Score %c${scoreStatus} %c: ${win} / ${rounds}
  ${player.bonus > 0 ? '\nBonus :' : DisplayIcons("⭐️", player.bonus)}`, `color: ${color}`, `color: white`)
}
  
function Capitalize(word) {
  return word[0].toUpperCase() + word.substring(1)
}

function PickRandomQuestion() {
  const questions = Object.keys(bonusQuestions)
  const randomNumber = Math.floor(Math.random() * questions.length)

  return questions[randomNumber]
}

function DisplayBonusQuestion() {
  const randomQuestion = PickRandomQuestion()
  const instructionIfBooleanResponse = bonusQuestion[randomQuestion] === true || false ? 'Type true of false :' : ''
  let bonusQuestion = prompt(`Bonus question ! ${instructionIfBooleanResponse}
  \n\n${randomQuestion}`)
  bonusQuestion = FormatField(bonusQuestion)

  ValidateBonusQuestion(bonusQuestion)
}

function ValidateBonusQuestion(bonusQuestion) {
  if (bonusQuestion === bonusQuestion[randomQuestion]) {
    player.addBonus()
  }
}

  

export { DisplayIcons, FormatField, DisplayResultInConsole, Capitalize, DefineModality, name, surname, categoryChoosen, DisplayBonusQuestion }