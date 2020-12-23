import { useState } from 'react'
import { useQuery } from 'react-query'
import { API } from 'aws-amplify'
import { listWorkChunks } from 'graphql/queries'


export const useFetchChunks = (workId = 'ab6e561b-b280-4ee4-9214-4c94d8da2ae5') => {
  const [ chunks, setChunks ] = useState([])

  const fetchChunks = key => API.graphql({ query: listWorkChunks, variables: { limit: 1000, filter: { workID: { eq: workId } }}})

  const query = useQuery('chunks', fetchChunks , {
    onSuccess: data => setChunks(data.data.listWorkChunks.items),
    onError: error => console.log(error)
  })

  return { ...query, data: chunks }

}

export default useFetchChunks
