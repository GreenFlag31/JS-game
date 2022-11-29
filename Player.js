export class Player {
  constructor(life) {
    this.life = life
  }

  DecrementLife() {
    return this.life--
  }

  IncrementLife() {
    return this.life++
  }
}