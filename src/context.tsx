import * as React from 'react'
import { createContext, Dispatch, SetStateAction, Reducer, ReducerState, ReducerAction, useReducer, useContext } from 'react'

export enum ACTION_TYPES {
  'MAXIMIZED_VIDEO' = 'MAXIMIZED_VIDEO',
  'MINIMIZED_VIDEO' = 'MINIMIZED_VIDEO',
  'UPDATED_VOLUME' = 'UPDATED_VOLUME',
  'MUTED_VOLUME' = 'MUTED_VOLUME',
}

export interface PlayerState {
  endTime: number;
  isMuted: boolean;
  isVideoMaximized: boolean;
  onToggleVideoSize: (isMaximized?: boolean) => void;
  url: string;
  volume: number;
}

interface BaseAction {
  type: keyof typeof ACTION_TYPES;
}

interface VideoAction extends BaseAction {
  
}

interface VolumeAction extends BaseAction {
  volume: number;
}

type PlayerAction = VideoAction | VolumeAction

type PlayerReducer = Reducer<PlayerState, PlayerAction>
type PlayerContextType = [ReducerState<PlayerReducer>, Dispatch<ReducerAction<PlayerReducer>>]

const PlayerContext = createContext<PlayerContextType>([{
  endTime: -1,
  isMuted: true,
  isVideoMaximized: false,
  onToggleVideoSize: () => {},
  url: '',
  volume: 0.5,
}, (state: any) => state])

interface PlayerProviderProps {
  children: React.ReactChildren | React.ElementType | React.ReactNode;
  initialState: PlayerState;
}

const reducer = (state: PlayerState, action: PlayerAction) => {
  switch(action.type) {
    case ACTION_TYPES.MAXIMIZED_VIDEO:
    case ACTION_TYPES.MINIMIZED_VIDEO:
      return {
        ...state,
        isVideoMaximized: !state.isVideoMaximized,
      }
    case ACTION_TYPES.UPDATED_VOLUME:
      return {
        ...state,
        isMuted: false,
        volume: (action as VolumeAction).volume,
      }
    case ACTION_TYPES.MUTED_VOLUME:
      return {
        ...state,
        isMuted: !state.isMuted,
      }
    default:
      return state
  }
}

export const updateVolumeAction: (volume: number) => VolumeAction = (volume) => ({ type: ACTION_TYPES.UPDATED_VOLUME, volume })
export const muteVolumeAction = () => ({ type: ACTION_TYPES.MUTED_VOLUME })

export const PlayerProvider: React.FunctionComponent<PlayerProviderProps> = ({ children, initialState }) => {
  return (
    <PlayerContext.Provider value={useReducer<Reducer<PlayerState, PlayerAction>>(reducer, initialState)} >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayerStateValue = () => useContext<PlayerContextType>(PlayerContext)
