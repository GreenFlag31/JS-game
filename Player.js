class Player {
  #life
  #bonus 

  constructor() { }

  get life() {
    return this.#life
  }
  
  set life(value) {
    this.#life = value
  }

  DecrementLife() {
    return this.#life--
  }

  IncrementLife() {
    return this.#life++
  }

  Alive() {
    return this.life > 0
  }

  get bonus() {
    return this.#bonus
  }

  AddBonus() {
    return this.#bonus++
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
    this.points = this.ComputeTotalPoints()
    this.SetRecords()
  }
  
  SetRecords() {
    this.life = this.life.join('')
    this.bonus = this.bonus.join('')
    this.AppendToSessionStorage()
    this.RetrieveExistingRecords()
    this.SortRanking()
    this.DisplayRecordsInConsole()
  }

  ComputeTotalPoints() {
    if (this.category === 'hard') {
      return (this.life.length * 1.5) + (this.win * 1.25) + (this.bonus.length * 1.75) - this.penalty
    }

    return this.life.length + (this.win * 1.25) + (this.bonus.length * 1.75) - this.penalty
  }

  RetrieveExistingRecords() {
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


    // sessionStorage.clear()
    // faire un sessionStorage.clear() et re populer la SS
    reversedRecords = reversedRecords.reverse()
    for (i = 0; i < reversedRecords.length; i++) {
      if (hash[reversedRecords[i]]) {
        // sessionStorage.removeItem(`record-${sessionStorage.length - i - 1}`)
        this.#records.splice(this.#records.length - i - 1, 1)
        debugger
        continue
      }
      hash[reversedRecords[i]] = true
      // sessionStorage.setItem(`record-${i}`)
    }
  }



  AppendToSessionStorage() {
    // No existing method to append on sessionStorage
    let i = 0
    let sessionRecord = sessionStorage.getItem(`record-${i}`)
    while(sessionRecord) {
      i++
      sessionRecord = sessionStorage.getItem(`record-${i}`)
    }

    sessionStorage.setItem(`record-${i}`, JSON.stringify(this))
  }

  SortRanking() {
    this.#records.sort((a, b) => b.points - a.points)
  }

  DisplayRecordsInConsole() {
    console.log('\n%c ACTUAL RANKING : \n', 'color: BlueViolet; font-weight: 900; font-size; 1.3em')
    console.table(this.#records)
  }

}

export { Player, PlayerData }