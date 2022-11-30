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
  constructor(name, life, bonus, win, category, penalty) {
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
    this.life.join()
    this.bonus.join()
    window.RANKING.push(this)
    this.SortRanking()
  }

  ComputeTotalPoints() {
    if (this.category === 'hard') {
      return (this.life.length * 1.5) + (this.win * 1.25) + (this.bonus.length * 1.75) - this.penalty
    }

    return this.life.length + (this.win * 1.25) + (this.bonus.length * 1.75) - this.penalty
  }

  SortRanking() {
    window.RANKING.sort((a, b) => b.points - a.points)
  }

}

export { Player, PlayerData }