import { player, win, previousRatio } from './game.js'
import { rounds, categorySurname, lifePerCategory } from './CONSTANTS.js'


let categoryChoosen = ""

function DefineModality() {
  const name = prompt('Alright recruit, give me your name :', '')
  if (!name) {
    alert('Alright, you will be called Simone ! 🤓');
  }
  
  let categorySelection = prompt(`Stand up ${name}, and pick up your difficulty level !\nChoose between : easy - medium - hard`)
  categorySelection = FormatField(categorySelection)
  
  let surname = categorySurname[categorySelection] ?? "rockstar"
  
  
  for (const [key, value] in categorySurname) {
    if (surname === value) {
      categoryChoosen = key
      player.life = lifePerCategory[key]
      break
    }
  }
}



function DisplayHeartsLife() {
  let numberOfHearts = 0

  for (let i = 0; i < lifePerCategory[categoryChoosen]; i++) {
    numberOfHearts += "❤️"
  }

  return numberOfHearts
}
  

function FormatField(field) {
  field = field.toLowerCase().replace(/\s|\W|[0-9]/g, '')
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
  console.log(`Score %c${scoreStatus} %c: ${win} / ${rounds}`, `color: ${color}`, `color: white`)
}
  
  
function Capitalize(word) {
  return word[0].toUpperCase() + word.substring(1)
}
  

export {DisplayHeartsLife, FormatField, DisplayResultInConsole, Capitalize, DefineModality}