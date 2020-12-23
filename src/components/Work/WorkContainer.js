import { useEffect } from 'react'
import Work from './Work'
import { useState, useDispatch } from 'context/Context'
import useFetchChunks from 'utils/useFetchChunks'


export const WorkContainer = ({ id, ...props }) => {
  const dispatch = useDispatch()

  const { isLoaded, items } = useState()

  const { data } = useFetchChunks()

  useEffect(() => {
    if (isLoaded || data.length === 0) return

    dispatch({ type: 'setItems', payload: data })
  }, [ data, dispatch, isLoaded])

  return (
    <Work items={items || []} {...props} />
  )
}

export default WorkContainer
