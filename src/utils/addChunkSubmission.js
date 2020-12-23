import path from 'path'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import { updateWorkChunk } from 'graphql/mutations'
import { v4 as uuid } from 'uuid'


export const addChunkSubmission = async (file, chunkId) => {
  const id = uuid()

  const extension = path.extname(file.name)

  const filename = `${id}${extension}`

  try {
    const { key } = await Storage.put(filename, file, { contentType: file.type })

    // update chunk record with submission filename
    const updateWorkChunkInput = {
      id: chunkId,
      filename: key
    }

    const result = await API.graphql(graphqlOperation(updateWorkChunk, { input: updateWorkChunkInput }))

    return result
  } catch(e) {
    console.log(e)
  }
}

export default addChunkSubmission
