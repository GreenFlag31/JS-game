import { RANKING } from './CONSTANTS.js'

class Player {
  constructor() {
  }

  get life() {
    return this._life
  }
  
  set life(value) {
    this._life = value
  }

  DecrementLife() {
    return this._life--
  }

  IncrementLife() {
    return this._life++
  }

  Alive() {
    return life > 0
  }
}


class PlayerData {
  constructor(name, life, bonus, win, category) {
    this.Name = name
    this.Life = life
    this.Bonus = bonus
    this.Win = win
    this.Category = category
  }

  Records(data) {
    RANKING.push(data)
  }
}

// name, life, bonus, win, category
export { Player, PlayerData }