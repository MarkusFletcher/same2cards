import { CardField } from '../modules/CardField'
import { CardSprite } from '../objects/sprites/CardSprite'
import { Scene } from 'phaser'
import { GameMenu } from '../modules/GameMenu'
import {
  EnumActions,
  EnumTemplateTypes,
} from '../interfaces/game-menu.interface'

export class GameScene extends Scene {
  private _cardField!: CardField
  private _menu!: GameMenu

  constructor() {
    super('GameScene')
  }
  preload() {}

  async create() {
    this._cardField = new CardField(this)

    this._menu = new GameMenu()
    this._menu.render({ type: EnumTemplateTypes.START_TEMPLATE })
    this.setupEvents()
  }

  private setupEvents() {
    this._cardField.addAllCardsOpenListener(this.onFinishGame)
    this._menu.addListener(EnumActions.START_GAME, this.onStartGame)
  }

  private clickHandler = (_: unknown, object: unknown) => {
    if (object instanceof CardSprite) {
      if (!this._cardField.isLock) this._cardField.openCard(object)
    }
  }

  private onStartGame = () => {
    this._cardField.createCards().then(() => {
      this.input.on('gameobjectdown', this.clickHandler)
    })
  }

  private onFinishGame = () => {
    this._menu.render({ type: EnumTemplateTypes.END_TEMPLATE, isWin: true })
  }
}
