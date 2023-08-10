import {
  EnumTemplateTypes,
  EnumActions,
  IGameMenuProps,
  TActions,
} from '../interfaces/game-menu.interface'

export class GameMenu {
  private _container!: HTMLElement

  private _actions: TActions = {
    [EnumActions.START_GAME]: () => {
      this._container.remove()
      console.log(this._onStartListeners)
      this._onStartListeners.forEach(listener => listener())
    },
    [EnumActions.RESTART_GAME]: () => {
      this._container.remove()
      console.log('restart')
    },
  }

  private _onStartListeners: Array<(...args: any) => void> = []

  addListener(type: EnumActions, callback: (...args: any) => void) {
    switch (type) {
      case EnumActions.START_GAME:
        this._onStartListeners.push(callback)
        break

      default:
        break
    }
  }

  render({ type, isWin }: IGameMenuProps) {
    this._container = document.createElement('div')
    this._container.classList.add('menu-container')
    this._container.innerHTML =
      type === EnumTemplateTypes.START_TEMPLATE
        ? this.startTemplate()
        : this.endTemplate(isWin ?? false)
    this.setupEvents()

    document.body.append(this._container)
  }

  setupEvents() {
    this._container.addEventListener('click', ({ target }: MouseEvent) => {
      if (target instanceof HTMLButtonElement) {
        const type = target.dataset.action as EnumActions
        this._actions[type]?.()
      }
    })
  }

  private startTemplate = () => `
	<div class="modal">
		<span>Game</span>
		<button data-action="${EnumActions.START_GAME}">Start</button>
	</div>`

  private endTemplate = (isWin: boolean) => `
	<div class="modal">
		<span>You ${isWin ? 'win' : 'lose'}!</span>
		<button data-action="${EnumActions.START_GAME}">Restart</button>
	</div>`
}
