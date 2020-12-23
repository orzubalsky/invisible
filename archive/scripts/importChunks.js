import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import awsExports from '../aws-exports'
import { createWorkChunk } from '../graphql/mutations'
import chunks from '../data/chunks.json'


Amplify.configure(awsExports)

export const importChunks = async () => {
  const workId = 'ab6e561b-b280-4ee4-9214-4c94d8da2ae5'

  chunks.data.filter(chunk => chunk.work_id === 6).map(async chunk => {
    try {
      const id = uuid()

      const createWorkChunkInput = {
        id,
        id_legacy: chunk.id,
        number: chunk.number,
        index: chunk.index,
        text: chunk.text,
        is_active: chunk.is_active,
        created_legacy: new Date(chunk.created).toISOString(),
        updated_legacy: new Date(chunk.updated).toISOString(),
        workID: workId
      }

      await API.graphql(graphqlOperation(createWorkChunk, { input: createWorkChunkInput }))
    } catch(e) {
      console.log(e)
    }
  })
}

importChunks()

export default importChunks
