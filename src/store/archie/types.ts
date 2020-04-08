export const UPSERT_ARCHIE = "UPSERT_ARCHIE";

export interface Archie {
  [key: string]: any;
}

export interface ArchieState {
  copy: Archie;
  hydrated: boolean;
}

export interface UpsertArchieAction {
  type: typeof UPSERT_ARCHIE;
  archie: Archie;
}

export type ArchieAction = UpsertArchieAction;
