import { useEffect, useState } from 'react'
import getChunkSubmission from 'utils/getChunkSubmission'


export const useFilename = itemFilename => {
  const [ filename, setFilename ] = useState()

  useEffect(() => {
    if (!itemFilename) return

    getChunkSubmission(itemFilename).then(result => setFilename(result))
  }, [ itemFilename ])

  return filename
}

export default useFilename
