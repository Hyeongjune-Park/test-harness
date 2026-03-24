# Decisions: PATCH /tasks/:id/title

## D1 — Route scoped to field

Route is `PATCH /tasks/:id/title`, not `PATCH /tasks/:id`.
Consistent with `patch-complete` naming convention; semantically scoped to the field being changed.

## D2 — `findTaskById` returns `Task | null` (authoritative definition)

`Task | null` is the authoritative return type.
This plan introduces the first implementation of `findTaskById` and owns the definition.

Rationale: `decisions-patch-complete.md` D2 mandates null sentinel —
"Allows strict `=== null` check; avoids falsy-check ambiguity."
The affected-files table in `plan-patch-complete.md` lists `Task | undefined`;
this is a transcription error. The decision document is the authoritative source.

Collision mitigation: if `findTaskById` already exists when this feature is implemented,
check presence AND return type. If `Task | undefined`, correct to `Task | null`.

## D3 — `updateTaskTitle` returns `Task | null`

Null signals not-found. Consistent with null sentinel pattern from D2.
Controller uses strict `=== null` check (not falsy).

## D4 — Title is trimmed at the controller boundary

Controller trims `req.body.title` before passing to `updateTaskTitle`.
Validator uses `.trim()` only for the blank check (validation gate), not as a transform.
The two trim calls are independent; neither substitutes for the other.
Service receives an already-trimmed value and does not re-trim.

## D5 — Separate validator function `validatePatchTitleInput`

Accepts `input: unknown` (raw `req.body`); includes object-shape guard before property access.
Structurally different from `validateCreateTaskInput`, which accepts a typed partial
(`CreateTaskInput`) and has no object-shape guard.
No code is shared between the two functions; they remain independent.

## D6 — 404 error message: `"task not found"`

Follows existing lowercase short-phrase convention
(cf. `"title is required"`, `"title must not be empty"` from existing validator).

## D7 — 200 response returns full Task shape

`{ id: string; title: string; completed: boolean }` — same shape as `POST /tasks` 201 response.
Caller always receives current task state after patch.

---

# Risks: PATCH /tasks/:id/title

## R1 — `findTaskById` contract conflict with patch-complete (mitigated)

If patch-complete is implemented first and adds `findTaskById` with return type `Task | undefined`,
the null-check in `updateTaskTitle` would silently fail.
Mitigation: Step 1 of this plan requires checking both presence and return type before writing.
Status: Resolved — `findTaskById` added with `Task | null` return type in this implementation; no prior definition existed at time of implementation (confirmed 2026-03-24).

## R2 — In-place title mutation visible to all callers (accepted)

`updateTaskTitle` mutates the task object returned by `findTaskById` directly.
Consistent with existing `completeTask` pattern and the in-memory store design.
Would be a correctness risk if persistence is ever added.
Status: Accepted within current in-memory scope.

---

# Follow-ups: PATCH /tasks/:id/title

## F1 — `docs/spec.md` structural placement (open)

The `PATCH /tasks/:id/title` section was added after `## Constraints` instead of inside
`## Current Public API`. Future maintainers scanning the public API section will miss it.
Fix: move the `### PATCH /tasks/:id/title` block to sit after `### GET /tasks` under
`## Current Public API`. Docs-only edit, no re-review needed.
Status: Open — not yet applied.

## F2 — `completed: true` preservation test (deferred)

Test 9 verifies `completed: false` is not reset. Cannot test `completed: true` preservation
without `PATCH /tasks/:id/complete` being implemented.
Fix: after patch-complete is implemented, add a test that sets `completed: true`,
patches the title, and asserts `completed: true` is preserved.
Status: Deferred until patch-complete is available.

## R3 — `req.body` parsing assumed (low, inferred)

`express.json()` middleware is assumed to be in place based on `app.ts` and existing POST endpoint.
If absent, `req.body` would be undefined and the object-shape guard would catch it.
Status: Resolved — `express.json()` confirmed present in `src/app.ts` (directly inspected 2026-03-24).
