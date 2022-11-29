
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
  

export {DisplayHeartsLife, FormatField, DisplayResultInConsole, Capitalize}