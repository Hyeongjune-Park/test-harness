# Risks

_Last updated: 2026-03-13_

## 문서-코드 충돌 (Non-blocking)

이 항목들은 코드 동작에 영향을 주지 않으나 혼란을 유발할 수 있다.

| 문서 | 충돌 내용 | 해소 방법 | 시점 |
|---|---|---|---|
| `README.md` | "Search does not exist yet" — 실제로 존재함 | README.md 수정 | Step 4 |
| `README.md` | "Duplicate item protection already exists" — 실제로 없음 | README.md 수정 | Step 4 |
| `docs/spec.md` | 중복 규칙 기술 — 코드에 미구현 | Step 1~3 구현으로 해소 | 구현 완료 후 |

> decisions.md에 포함하지 않음 (충돌 중인 사항, 사용자 지시).

---

## 미결 항목

### 검증 격리 방법 미결

- **상황:** `items`가 모듈 레벨 상태. 5개 검증 케이스를 순서대로 실행하면 배열 상태가 변화해 결과가 달라질 수 있음.
- **선택지:** (a) 케이스별 초기 배열 상태 명시, (b) 최소 테스트 파일 추가.
- **처리 시점:** 구현 Step 1 이전 또는 검증 전.

### 거부 메시지 `name` 타입 미결

- **상황:** 메시지에 출력할 `name`이 raw input인지 `formatItemName` 처리 후 값인지 계획에 명시되지 않음.
- **영향:** 기능 정확성에 영향 없음. 로그 가독성에만 영향.
- **처리 시점:** 구현 Step 3 전에 계획 문서에 명시.

### category 비교 주석 여부 미결

- **상황:** case-insensitive 채택 결정은 완료됐으나, 코드 주석에 근거를 남길지 여부 미결.
- **영향:** 없음. 선택적 항목.
