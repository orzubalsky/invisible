/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createWork = /* GraphQL */ `
  mutation CreateWork(
    $input: CreateWorkInput!
    $condition: ModelWorkConditionInput
  ) {
    createWork(input: $input, condition: $condition) {
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
export const updateWork = /* GraphQL */ `
  mutation UpdateWork(
    $input: UpdateWorkInput!
    $condition: ModelWorkConditionInput
  ) {
    updateWork(input: $input, condition: $condition) {
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
export const deleteWork = /* GraphQL */ `
  mutation DeleteWork(
    $input: DeleteWorkInput!
    $condition: ModelWorkConditionInput
  ) {
    deleteWork(input: $input, condition: $condition) {
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
export const createWorkChunk = /* GraphQL */ `
  mutation CreateWorkChunk(
    $input: CreateWorkChunkInput!
    $condition: ModelWorkChunkConditionInput
  ) {
    createWorkChunk(input: $input, condition: $condition) {
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
export const updateWorkChunk = /* GraphQL */ `
  mutation UpdateWorkChunk(
    $input: UpdateWorkChunkInput!
    $condition: ModelWorkChunkConditionInput
  ) {
    updateWorkChunk(input: $input, condition: $condition) {
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
export const deleteWorkChunk = /* GraphQL */ `
  mutation DeleteWorkChunk(
    $input: DeleteWorkChunkInput!
    $condition: ModelWorkChunkConditionInput
  ) {
    deleteWorkChunk(input: $input, condition: $condition) {
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
