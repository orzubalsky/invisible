import Amplify, { API, graphqlOperation } from 'aws-amplify'
import awsExports from '../aws-exports'
import { updateWorkChunk } from '../graphql/mutations'
import { listWorkChunks } from '../graphql/queries'
import chunks from '../data/chunks.json'
import chunkSubmissions from '../data/chunk_submissions.json'


Amplify.configure(awsExports)

export const importChunkSubmissions = async () => {
  const chunkIds = chunks.data.filter(chunk => chunk.work_id === 6).map(chunk => chunk.id)

  const chunkList = await API.graphql(graphqlOperation(listWorkChunks, { limit: 1000 }))

  chunkSubmissions.data.filter(submission => chunkIds.includes(submission.chunk_id)).map(async (submission, i) => {
    try {
      const filename = submission.audio_file.split('/')[2]

      const chunk = chunkList.data.listWorkChunks.items.find(c => c.id_legacy === submission.chunk_id)

      if (chunk) {
        // update chunk record with submission filename
        const updateWorkChunkInput = {
          id: chunk.id,
          filename_legacy: submission.audio_file,
          filename: filename
        }

        await API.graphql(graphqlOperation(updateWorkChunk, { input: updateWorkChunkInput }))
      }
    } catch(e) {
      console.log(e)
    }
  })
}

importChunkSubmissions()

export default importChunkSubmissions
