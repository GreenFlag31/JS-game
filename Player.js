import { numberOfHearts } from "./game.js"
import { numberOfBonus } from "./helpers.js"

class Player {
  #life
  #bonus = 0

  constructor() { }

  get life() {
    return this.#life
  }
  
  set life(value) {
    this.#life = value
  }

  decrementLife() {
    return this.#life--
  }

  incrementLife() {
    return this.#life++
  }

  alive() {
    return this.life > 0
  }

  get bonus() {
    return this.#bonus
  }

  set bonus(value) {
    return this.#bonus = value
  }

  addBonus() {
    return this.#bonus++
  }

  substractBonus() {
    return this.#bonus--
  }
  
}


class PlayerData {
  #records = []

  constructor(name, life, bonus, win, category, penalty = 0) {
    this.name = name
    this.life = life
    this.bonus = bonus
    this.win = win
    this.category = category
    this.penalty = penalty
    this.points = this.computeTotalPoints()
    this.SetRecords()
  }
  
  SetRecords() {
    this.transformLifeAndBonusToIcon()
    this.appendToSessionStorage()
    this.retrieveExistingRecords()
    this.sortRanking()
    this.displayRecordsInConsole()
  }

  computeTotalPoints() {
    if (this.category === 'hard') {
      return (this.life * 1.5) + (this.win * 1.25) + (this.bonus * 1.95) - this.penalty
    }

    return this.life + (this.win * 1.25) + (this.bonus * 1.75) - this.penalty
  }

  retrieveExistingRecords() {
    this.#records = []
    let reversedRecords = []
    const hash = {}

    let i = 0
    let sessionRecord = sessionStorage.getItem(`record-${i}`)

    while(sessionRecord) {
      const previousRecord = JSON.parse(sessionRecord)
      this.#records.push(previousRecord)
      reversedRecords.push(previousRecord.name)
      i++
      sessionRecord = sessionStorage.getItem(`record-${i}`)
    }


    // record-0
    // record-1
    // STOPPED
    // record-3
    // ...

    // sessionStorage.clear()
    //  - 1 correction because of LiveServer !
    reversedRecords = reversedRecords.reverse()
    for (i = 0; i < reversedRecords.length; i++) {
      if (hash[reversedRecords[i]]) {
        // removes the duplicate
        sessionStorage.removeItem(`record-${sessionStorage.length - i - 1}`)
        // add the current one in place
        sessionStorage.setItem(`record-${sessionStorage.length - i - 1}`,
        JSON.stringify(sessionStorage.length - 1))
        // this.#records[hash.indexOf(reversedRecords[i])] ?
        // removes the current one at last index
        sessionStorage.removeItem(`record-${sessionStorage.length - 1}`)


        this.#records.splice(this.#records.length - i - 1, 1)
        debugger
        continue
      }
      hash[reversedRecords[i]] = true
      // sessionStorage.setItem(`record-${i}`)
    }
  }

  appendToSessionStorage() {
    // No existing method to append on sessionStorage
    let i = 0
    let sessionRecord = sessionStorage.getItem(`record-${i}`)
    while(sessionRecord) {
      i++
      sessionRecord = sessionStorage.getItem(`record-${i}`)
    }

    sessionStorage.setItem(`record-${i}`, JSON.stringify(this))
  }

  transformLifeAndBonusToIcon() {
    this.life = numberOfHearts.length === 0 ? '💀💀💀' : numberOfHearts
    this.bonus = numberOfBonus.length === 0 ? 0 : numberOfBonus
  }

  sortRanking() {
    this.#records.sort((a, b) => b.points - a.points)
  }

  displayRecordsInConsole() {
    console.log('\n%c ACTUAL RANKING : \n', 'color: BlueViolet; font-weight: 900; font-size; 1.3em')
    console.table(this.#records)
  }

}

export { Player, PlayerData }