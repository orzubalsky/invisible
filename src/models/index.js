// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Work, WorkChunk } = initSchema(schema);

export {
  Work,
  WorkChunk
};