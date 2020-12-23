import clsx from 'clsx'
import useFadeIn from 'utils/useFadeIn'
import './Menu.css'


export const Menu = ({ isPlaying, toggleAbout, toggleContribute, toggleIdle, toggleListen }) => {
  const [ isVisible ] = useFadeIn()

  const className = clsx('Menu', isVisible && 'visible')

  return (
    <div className={className}>
      {isPlaying
        ? <button id='pause' onClick={toggleIdle}>
          Pause
        </button>
        : <button id='play' onClick={toggleListen}>
          Listen
        </button>
      }
      <button id='upload' onClick={toggleContribute}>
        Contribute
      </button>
      <button id='info' onClick={toggleAbout}>
        Description
      </button>
    </div>
  )
}

export default Menu
