// Logic Building sheet (SamitKnows) — loops, iteration & dry-run thinking.
// One file per phase; each exports `PHASE = { id, num, title, goal, problems: [] }`.
import { PHASE as P1 } from "./phase1";
import { PHASE as P2 } from "./phase2";
import { PHASE as P3 } from "./phase3";
import { PHASE as P4 } from "./phase4";
import { PHASE as P5 } from "./phase5";
import { PHASE as P6 } from "./phase6";
import { PHASE as P7 } from "./phase7";
import { PHASE as P8 } from "./phase8";

export const LOGIC_PHASES = [P1, P2, P3, P4, P5, P6, P7, P8];

export function totalLogicProblems() {
  return LOGIC_PHASES.reduce((n, p) => n + p.problems.length, 0);
}
