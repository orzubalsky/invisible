import { useDispatch, useState } from 'context/Context'
import { APP_STATES } from 'utils/constants'
import { useFilename } from 'utils/useFilename'
import WorkChunk from './WorkChunk'


export const WorkChunkContainer = ({ item, ...props }) => {
  const dispatch = useDispatch()

  const { appState, selectedId } = useState()

  const filename = useFilename(item && item.filename)

  const handleSelect = () => {
    if (appState === APP_STATES.CONTRIBUTING && !item.filename) {
      dispatch({ type: 'setSelectedId', payload: item.id })
      dispatch({ type: 'setIsContributeVisible', payload: false })
    }

    if (appState === APP_STATES.PLAYING && item.filename) {
      dispatch({ type: 'setSelectedId', payload: item.id })
    }
  }

  const isContributing = appState === APP_STATES.CONTRIBUTING

  const isPlaying = appState === APP_STATES.PLAYING

  const isSelected = (appState === APP_STATES.CONTRIBUTING || appState === APP_STATES.PLAYING) && item.id === selectedId

  return <WorkChunk
    filename={filename}
    handleSelect={handleSelect}
    isContributing={isContributing}
    isPlaying={isPlaying}
    isSelected={isSelected}
    item={item}
    {...props}
  />
}

export default WorkChunkContainer
