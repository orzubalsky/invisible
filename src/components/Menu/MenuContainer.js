import { useDispatch, useState } from 'context/Context'
import { APP_STATES } from 'utils/constants'
import Menu from './Menu'


export const MenuContainer = props => {
  const dispatch = useDispatch()

  const { appState } = useState()

  const isPlaying = appState === APP_STATES.PLAYING

  return <Menu
    isPlaying={isPlaying}
    toggleAbout={() => dispatch({ type: 'setIsAboutVisible', payload: true })}
    toggleContribute={() => dispatch({ type: 'setAppState', payload: APP_STATES.CONTRIBUTING })}
    toggleIdle={() => dispatch({ type: 'setAppState', payload: APP_STATES.IDLE })}
    toggleListen={() => dispatch({ type: 'setAppState', payload: APP_STATES.PLAYING })}
    {...props}
  />
}

export default MenuContainer

