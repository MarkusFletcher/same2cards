import { GameObjects, Scene } from 'phaser'
import { CardId, ICardProps } from '../../interfaces/card.interface'

export class CardSprite extends GameObjects.Sprite {
  readonly id: CardId
  private _isOpen: boolean

  constructor(scene: Scene, props: ICardProps) {
    super(scene, props.x, props.y, 'card_cover')

    this.id = props.id
    this._isOpen = false

    this.setInteractive()
    this.setOrigin(0, 0)
    this.scene.add.existing(this)
  }

  get isOpen() {
    return this._isOpen
  }

  createAnimation(x: number, y: number) {
    return new Promise(animationResolve => {
      this.scene.tweens.add({
        targets: this,
        ease: 'Linear',
        duration: 100,
        x,
        y,
        onComplete: animationResolve,
      })
    })
  }

  async flip() {
    return new Promise(animationResolve => {
      const show = () => {
        this.scene.tweens.add({
          targets: this,
          ease: 'Linear',
          x: this.x - this.width / 2,
          scaleX: 1,
          duration: 100,
          onComplete: animationResolve,
        })
      }

      this.scene.tweens.add({
        targets: this,
        ease: 'Linear',
        scaleX: 0,
        x: this.x + this.width / 2,
        duration: 100,
        texture: `card_${this._isOpen ? 'cover' : this.id}`,
        onComplete: show,
      })
    })
  }

  async open() {
    await this.flip()
    this._isOpen = true
    // this.setTexture(`card_${this.id}`)
  }

  async close() {
    await this.flip()
    this._isOpen = false
    // this.setTexture('card_cover')
  }
}
