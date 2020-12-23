import clsx from 'clsx'
import { useState } from 'context/Context'
import AboutContainer from 'components/About/AboutContainer'
import ContributeContainer from 'components/Contribute/ContributeContainer'
import MenuContainer from 'components/Menu/MenuContainer'
import PlayerContainer from 'components/Player/PlayerContainer'
import WorkContainer from 'components/Work/WorkContainer'
import './App.css'


export const App = () => {
  const { appState } = useState()

  const className = clsx('App', `App--${appState}`)

  return (
    <div className={className}>
      <div className='Content'>
        <PlayerContainer />
        <MenuContainer />
        <ContributeContainer />
        <AboutContainer />
        <WorkContainer id={6} />
      </div>
    </div>
  )
}

export default App
