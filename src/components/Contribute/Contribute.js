import { useEffect, useState } from 'react'
import clsx from 'clsx'
import CloseButton from 'components/CloseButton/CloseButton'
import './Contribute.css'


export const Contribute = ({ isContributeVisible }) => {
  const [ isVisible, setIsVisible ] = useState(false)

  useEffect(() => {
    setIsVisible(isContributeVisible)
  }, [ isContributeVisible ])

  const handleClick = () => setIsVisible(false)

  const className = clsx(
    'Contribute',
    isVisible && 'visible',
  )

  return (
    <div className={className}>
        <CloseButton  onClick={handleClick} />
        <div style={{ clear:'both' }}>
          Select a segment of text that you would like to read aloud (scroll down for more text). Speak as clearly as possible and record it on a sound recorder, smart phone, or directly into your computer.
        </div>
    </div>
  )
}

export default Contribute
