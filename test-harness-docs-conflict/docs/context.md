# Context

_Last updated: 2026-03-13_

## 현재 코드 상태 (직접 확인)

- `addItem(name, category)`: name validation → maxItems check → push. **중복 검사 없음.**
- push 시 저장 형태: `{ id: items.length + 1, name: formatItemName(name), category: finalCategory }`
- `findItemsByKeyword(keyword)`: 존재함. `normalizeText()` 사용, case-insensitive 검색.
- `formatItemName`: `String(name).trim()` only — 대소문자 변환 없음.
- `normalizeText`: trim + lowercase, null/undefined → `""` 처리 포함.
- 초기 items 4개: `"Buy milk/home"`, `"Read book/study"`, `"Call mom/social"`, `"Clean room/home"`.
- `config.js`: `maxItems: 20`, `allowEmptyItems: false`, `defaultCategory: "general"`. 중복 관련 키 없음.

## 문서-코드 충돌 (확인된 불일치)

| 문서 | 주장 | 실제 코드 상태 | 분류 |
|---|---|---|---|
| `README.md` | "Duplicate item protection already exists" | 중복 검사 없음 | stale — 수정 필요 |
| `README.md` | "Search does not exist yet" | `findItemsByKeyword()` 존재 | stale — 수정 필요 |
| `docs/spec.md` | name+category 중복 규칙 기술 | 미구현 상태 | spec 의도와 코드 간 gap (구현으로 해소 예정) |

> `spec.md`는 "의도된 동작" 문서임을 자체 명시함. gap은 spec 오류가 아니라 미구현 상태.

## 문서 일치 항목

- `docs/notes.md` "No duplicate item check" → 코드 일치 ✓
- `docs/notes.md` "Search exists but is very basic" → 코드 일치 ✓
