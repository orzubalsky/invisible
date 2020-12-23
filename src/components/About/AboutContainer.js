import { useDispatch, useState } from 'context/Context'
import About from './About'


export const AboutContainer = props => {
  const dispatch = useDispatch()

  const { isAboutVisible } = useState()

  return <About
    handleClose={() => dispatch({ type: 'setIsAboutVisible', payload: false })}
    isVisible={isAboutVisible}
    {...props}
  />
}

export default AboutContainer
