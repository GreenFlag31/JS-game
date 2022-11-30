import { player, win, playRound, computerPlay } from './game.js'
import { rounds, categorySurname, lifePerCategory } from './CONSTANTS.js'


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



function DisplayHeartsLife() {
  let numberOfHearts = []

  for (let i = 0; i < player.life; i++) {
    numberOfHearts.push("❤️")
  }

  return numberOfHearts
}
  

function FormatField(field) {
  return field.toLowerCase().replace(/\s|\W|[0-9]/g, '')
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
  // 🔥
  console.log(`Score %c${scoreStatus} %c: ${win} / ${rounds}`, `color: ${color}`, `color: white`)
}
  
  
function Capitalize(word) {
  return word[0].toUpperCase() + word.substring(1)
}
  

export { DisplayHeartsLife, FormatField, DisplayResultInConsole, Capitalize, DefineModality, name, surname, categoryChoosen }