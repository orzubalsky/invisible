/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWork = /* GraphQL */ `
  subscription OnCreateWork {
    onCreateWork {
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
export const onUpdateWork = /* GraphQL */ `
  subscription OnUpdateWork {
    onUpdateWork {
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
export const onDeleteWork = /* GraphQL */ `
  subscription OnDeleteWork {
    onDeleteWork {
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
export const onCreateWorkChunk = /* GraphQL */ `
  subscription OnCreateWorkChunk {
    onCreateWorkChunk {
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
export const onUpdateWorkChunk = /* GraphQL */ `
  subscription OnUpdateWorkChunk {
    onUpdateWorkChunk {
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
export const onDeleteWorkChunk = /* GraphQL */ `
  subscription OnDeleteWorkChunk {
    onDeleteWorkChunk {
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
