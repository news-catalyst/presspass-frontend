import {
  UPSERT_ARCHIE,
  Archie,
  UpsertArchieAction
} from "./types";

export function upsertArchie(archie: Archie): UpsertArchieAction {
  return {
    type: UPSERT_ARCHIE,
    archie: archie,
  };
}
