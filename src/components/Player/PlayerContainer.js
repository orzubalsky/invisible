import { useEffect, useState } from 'react'
import { useDispatch, useState as useContextState  } from 'context/Context'
import { useFilename } from 'utils/useFilename'
import { APP_STATES } from 'utils/constants'
import Player from './Player'


export const PlayerContainer = () => {
  const dispatch = useDispatch()

  const { appState, items, selectedId } = useContextState()

  const [ item, setItem ] = useState()

  const filename = useFilename(item && item.filename)

  useEffect(() => {
    if (appState !== APP_STATES.PLAYING) return
    if (selectedId) return
    if (!items || items.length === 0) return

    const itemWithSubmission = items.find(item => item.filename)

    dispatch({ type: 'setSelectedId', payload: itemWithSubmission.id })
  }, [ appState, dispatch, items, selectedId ])

  useEffect(() => {
    if (appState !== APP_STATES.PLAYING) return
    if (!selectedId) return
    if (!items || items.length === 0) return

    setItem(items.find(item => item.id === selectedId))
  }, [ appState, items, selectedId ])

  if (appState !== APP_STATES.PLAYING || !selectedId) return null

  const pause = () => document.querySelector('audio').pause()

  const play = () => document.querySelector('audio').play()

  const onEnded = currentItem => {
    const nextItem = items.filter(item => item.id !== currentItem.id && item.number >= currentItem.number)[0]

    dispatch({ type: 'setSelectedId', payload: nextItem.id })
  }

  return <Player
    onEnded={() => onEnded(item)}
    onPause={pause}
    onReady={play}
    url={filename}
  />
}

export default PlayerContainer
