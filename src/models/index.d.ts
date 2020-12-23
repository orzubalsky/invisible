import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Work {
  readonly id: string;
  readonly id_legacy?: number;
  readonly name: string;
  readonly text_leagcy?: string;
  readonly text?: string;
  readonly is_active?: boolean;
  readonly created_legacy?: string;
  readonly updated_legacy?: string;
  readonly WorkChunks?: (WorkChunk | null)[];
  constructor(init: ModelInit<Work>);
  static copyOf(source: Work, mutator: (draft: MutableModel<Work>) => MutableModel<Work> | void): Work;
}

export declare class WorkChunk {
  readonly id: string;
  readonly id_legacy?: number;
  readonly number?: number;
  readonly index?: number;
  readonly text?: string;
  readonly is_active?: boolean;
  readonly filename_legacy?: string;
  readonly filename?: string;
  readonly created_legacy?: string;
  readonly updated_legacy?: string;
  readonly workID: string;
  constructor(init: ModelInit<WorkChunk>);
  static copyOf(source: WorkChunk, mutator: (draft: MutableModel<WorkChunk>) => MutableModel<WorkChunk> | void): WorkChunk;
}