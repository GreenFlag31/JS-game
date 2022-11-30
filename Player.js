class Player {
  #life
  constructor() {
  }

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
}


class PlayerData {
  constructor(name, life, bonus, win, category) {
    this.name = name
    this.life = life
    this.bonus = bonus
    this.win = win
    this.category = category
    this.points = this.ComputeTotalPoints()
    this.SetRecords()
  }
  
  SetRecords() {
    window.RANKING.push(this)
    this.SortRanking()
  }

  ComputeTotalPoints() {
    if (this.category === 'hard') {
      return (this.life * 1.5) + (this.win * 1.25) + (this.bonus * 1.75)
    }

    return this.life + (this.win * 1.25) + (this.bonus * 1.75)
  }

  SortRanking() {
    window.RANKING.sort((a, b) => b.points - a.points)
  }

}

export { Player, PlayerData }