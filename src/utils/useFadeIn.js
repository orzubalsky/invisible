import { useEffect, useState } from 'react'


export const useFadeIn = () => {
  const [ isVisible, setIsVisible ] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return [ isVisible, setIsVisible ]
}

export default useFadeIn
