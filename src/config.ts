import { AUTO, Types } from 'phaser'
import { PreloadScene } from './scenes/PreloadScene'
import { GameScene } from './scenes/GameScene'

const config: Types.Core.GameConfig = {
  type: AUTO,
  width: '100',
  height: '99',
  backgroundColor: '#333D37',
  scene: [PreloadScene, GameScene],
}

export default config
