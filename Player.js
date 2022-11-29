import {category, lifePerCategory} from './CONSTANTS.js'

export default class Player {
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