import { Scene } from 'phaser'

import card_cover from '../assets/images/cards/card_cover.png'
import card_1 from '../assets/images/cards/card_1.png'
import card_2 from '../assets/images/cards/card_2.png'
import card_3 from '../assets/images/cards/card_3.png'
import card_4 from '../assets/images/cards/card_4.png'
import card_5 from '../assets/images/cards/card_5.png'
import card_6 from '../assets/images/cards/card_6.png'
import card_7 from '../assets/images/cards/card_7.png'
import card_8 from '../assets/images/cards/card_8.png'
import card_9 from '../assets/images/cards/card_9.png'
import card_10 from '../assets/images/cards/card_10.png'
import card_11 from '../assets/images/cards/card_11.png'
import card_12 from '../assets/images/cards/card_12.png'
import card_13 from '../assets/images/cards/card_13.png'
import card_14 from '../assets/images/cards/card_14.png'
import card_15 from '../assets/images/cards/card_15.png'
import card_16 from '../assets/images/cards/card_16.png'
import card_17 from '../assets/images/cards/card_17.png'

export class PreloadScene extends Scene {
  constructor() {
    super('PreloadScene')
  }
  preload() {
    this.load.image('card_cover', card_cover)
    this.load.image('card_1', card_1)
    this.load.image('card_2', card_2)
    this.load.image('card_3', card_3)
    this.load.image('card_4', card_4)
    this.load.image('card_5', card_5)
    this.load.image('card_6', card_6)
    this.load.image('card_7', card_7)
    this.load.image('card_8', card_8)
    this.load.image('card_9', card_9)
    this.load.image('card_10', card_10)
    this.load.image('card_11', card_11)
    this.load.image('card_12', card_12)
    this.load.image('card_13', card_13)
    this.load.image('card_14', card_14)
    this.load.image('card_15', card_15)
    this.load.image('card_16', card_16)
    this.load.image('card_17', card_17)
  }

  create() {
    this.scene.start('GameScene')
  }
}
