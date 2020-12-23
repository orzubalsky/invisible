import { useState } from 'context/Context'
import addChunkSubmission from 'utils/addChunkSubmission'
import { APP_STATES } from 'utils/constants'
import WorkChunkUpload from './WorkChunkUpload'


export const WorkChunkUploadContainer = props => {
  const { appState, selectedId } = useState()

  if (appState !== APP_STATES.CONTRIBUTING || !selectedId) return null

  return (
    <WorkChunkUpload
      chunkId={selectedId}
      handleUpload={addChunkSubmission}
      {...props}
    />
  )
}

export default WorkChunkUploadContainer
