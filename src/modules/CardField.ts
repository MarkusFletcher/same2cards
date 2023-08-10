import { Scene, Utils } from 'phaser'
import { ICardPosition, CardId } from '../interfaces/card.interface'
import { CardSprite } from '../objects/sprites/CardSprite'

export class CardField {
  private readonly _scene: Scene
  private _pairs: number = 0
  private _prevCard: CardSprite | null = null
  private _possibleCardIds: CardId[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  ]
  private _lock: boolean = false

  private _allCardsOpenListeners: Array<(...args: any) => void> = []

  constructor(scene: Scene) {
    this._scene = scene
  }

  get isLock() {
    return this._lock
  }

  addAllCardsOpenListener(listener: (...args: any) => void) {
    this._allCardsOpenListeners.push(listener)
  }

  async openCard(card: CardSprite) {
    if (card.isOpen) return

    this._lock = true

    await card.open()

    if (!this._prevCard) {
      this._prevCard = card
      this._lock = false
      return
    }

    if (this._prevCard.id !== card.id) {
      setTimeout(async () => {
        await Promise.all([this._prevCard?.close(), card.close()])
        this._prevCard = null
        this._lock = false
      }, 500)
      return
    } else {
      this._pairs++
      this._prevCard = null
      console.log(this._pairs)
      if (this._pairs === 3) {
        this._allCardsOpenListeners.forEach(listener => listener())
      }
      this._lock = false
      return
    }
  }

  async createCards() {
    const cardIds = Utils.Array.Shuffle([
      ...this._possibleCardIds.slice(-3),
      ...this._possibleCardIds.slice(-3),
    ])

    const cardPositions = this.getCardPositions()

    if (cardPositions && cardIds) {
      let idx = 0
      for (const cardId of cardIds) {
        const card = new CardSprite(this._scene, {
          id: cardId,
          x: -200,
          y: -200,
        })
        await card.createAnimation(cardPositions[idx]?.x, cardPositions[idx]?.y)
        idx++
      }
      idx = NaN
    }
  }

  private getCardPositions(): ICardPosition[] | null {
    const cardPositions: ICardPosition[] = []

    const rows = 2
    const cols = 3
    const gap = 10

    const cardTexture = this._scene.textures.get('card_cover').getSourceImage()

    if (cardTexture) {
      const { height: cardHeight, width: cardWidth } = cardTexture
      const { height: screenHeight, width: screenWidth } =
        this._scene.game.canvas

      const marginTop =
        (screenHeight - (rows * cardHeight + gap * (rows - 1))) / 2
      const marginleft =
        (screenWidth - (cols * cardWidth + gap * (cols - 1))) / 2

      for (let row = 0; row < rows; row++) {
        const y = marginTop + row * (cardHeight + gap)
        for (let col = 0; col < cols; col++) {
          const x = marginleft + col * (cardWidth + gap)
          cardPositions.push({ x, y })
        }
      }
      return cardPositions
    }

    return null
  }
}
