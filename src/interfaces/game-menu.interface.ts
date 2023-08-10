export enum EnumTemplateTypes {
  START_TEMPLATE = 'start',
  END_TEMPLATE = 'end',
}

export enum EnumActions {
  START_GAME = 'start-game',
  RESTART_GAME = 'restart-game',
}

export interface IGameMenuProps {
  type: EnumTemplateTypes
  isWin?: boolean
}

export type TActions = {
  [key in EnumActions]: (...args: any) => void
}
