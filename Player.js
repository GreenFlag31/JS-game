import { numberOfHearts, numberOfBonus } from "./helpers.js"

class Player {
  /** @property {number} #life */
  #life
  /** @property {number} #bonus */
  #bonus

  constructor() {
    this.#life = 0
    this.#bonus = 0
  }

  get life() {
    return this.#life
  }
  
  /** @param {number} */
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
    return this.#life > 0
  }

  get bonus() {
    return this.#bonus
  }

  /** @param {number} */
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
  /** @property {Array} #records */
  #records = []
  /** @property {Array} #reversedRecords */
  #reversedRecords = []

  constructor(name, life, bonus, win, category, penalty = 0) {
    this.name = name
    this.life = life
    this.bonus = bonus
    this.win = win
    this.category = category
    this.penalty = penalty
    this.points = this.#roundTotalPoints()
    this.#setRecords()
  }
  
  #setRecords() {
    this.#transformLifeAndBonusToIcon()
    this.#appendToSessionStorage()
    this.#retrieveExistingRecords()
    this.#sortRanking()
    this.#displayRecordsInConsole()
  }

  #computeTotalPoints() {
    if (this.category === 'hard') {
      this.points = (this.life * 1.5) + (this.win * 1.25) + (this.bonus * 1.95) - this.penalty
    } else {
      this.points = this.life + (this.win * 1.25) + (this.bonus * 1.75) - this.penalty
    }
  }

  #roundTotalPoints() {
    this.#computeTotalPoints()
    return Math.floor((this.points * 100)) / 100
  }

  #retrieveExistingRecords() {
    this.#records = []
    this.#reversedRecords = []

    let i = 0
    let sessionRecord = sessionStorage.getItem(`record-${i}`)

    while(sessionRecord) {
      const previousRecord = JSON.parse(sessionRecord)
      this.#records.push(previousRecord)
      this.#reversedRecords.push(previousRecord.name)
      i++
      sessionRecord = sessionStorage.getItem(`record-${i}`)
    }

    // *** If you are using Live server ***
    sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer")

    this.#reversedRecords = this.#reversedRecords.reverse()
    this.#respectUnicityConstraintOnName()
  }

  #respectUnicityConstraintOnName() {
    const hash = {}

    for (let i = 0; i < this.#reversedRecords.length; i++) {
      if (hash[this.#reversedRecords[i]]) {
        // No existing replace() method on sessionStorage item !
        // removes the duplicate
        sessionStorage.removeItem(`record-${sessionStorage.length - i - 1}`)
        // add the current one in place. Deleted item, index has changed !
        sessionStorage.setItem(`record-${sessionStorage.length - i}`,
        sessionStorage.getItem(`record-${sessionStorage.length}`))
        // removes the current one at last index
        sessionStorage.removeItem(`record-${sessionStorage.length - 1}`)

        this.#records.splice(this.#records.length - i - 1, 1)
        continue
      }
      hash[this.#reversedRecords[i]] = true
    }
  }

  #appendToSessionStorage() {
    // No existing append() method on sessionStorage !
    let i = 0
    let sessionRecord = sessionStorage.getItem(`record-${i}`)
    while(sessionRecord) {
      i++
      sessionRecord = sessionStorage.getItem(`record-${i}`)
    }

    sessionStorage.setItem(`record-${i}`, JSON.stringify(this))
  }

  #transformLifeAndBonusToIcon() {
    this.life = numberOfHearts
    this.bonus = numberOfBonus
  }

  #sortRanking() {
    this.#records.sort((a, b) => b.points - a.points)
  }

  #displayRecordsInConsole() {
    console.log('\n%c ACTUAL RANKING : \n', 'color: BlueViolet; font-weight: 900; font-size; 1.3em')
    console.table(this.#records)
  }

}

export { Player, PlayerData }