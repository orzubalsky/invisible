import { Storage } from 'aws-amplify'


export const getChunkSubmission = async key => {
  try {
    const actualKey = key.includes('public') ? key.split('/')[1] : key

    const result = await Storage.get(actualKey)

    return result
  } catch(e) {
    console.log(e)
  }
}

export default getChunkSubmission
