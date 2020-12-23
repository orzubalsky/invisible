/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncWorks = /* GraphQL */ `
  query SyncWorks(
    $filter: ModelWorkFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWorks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        id_legacy
        name
        text_leagcy
        text
        is_active
        created_legacy
        updated_legacy
        WorkChunks {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getWork = /* GraphQL */ `
  query GetWork($id: ID!) {
    getWork(id: $id) {
      id
      id_legacy
      name
      text_leagcy
      text
      is_active
      created_legacy
      updated_legacy
      WorkChunks {
        items {
          id
          id_legacy
          number
          index
          text
          is_active
          filename_legacy
          filename
          created_legacy
          updated_legacy
          workID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listWorks = /* GraphQL */ `
  query ListWorks(
    $filter: ModelWorkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        id_legacy
        name
        text_leagcy
        text
        is_active
        created_legacy
        updated_legacy
        WorkChunks {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncWorkChunks = /* GraphQL */ `
  query SyncWorkChunks(
    $filter: ModelWorkChunkFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWorkChunks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        id_legacy
        number
        index
        text
        is_active
        filename_legacy
        filename
        created_legacy
        updated_legacy
        workID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getWorkChunk = /* GraphQL */ `
  query GetWorkChunk($id: ID!) {
    getWorkChunk(id: $id) {
      id
      id_legacy
      number
      index
      text
      is_active
      filename_legacy
      filename
      created_legacy
      updated_legacy
      workID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listWorkChunks = /* GraphQL */ `
  query ListWorkChunks(
    $filter: ModelWorkChunkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkChunks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        id_legacy
        number
        index
        text
        is_active
        filename_legacy
        filename
        created_legacy
        updated_legacy
        workID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
