# Plan: Duplicate Item 처리 구현

_Status: Approved with revisions — 계획 보완 3건 완료 후 구현 시작_
_Last updated: 2026-03-13_

## 목표

`spec.md`에 기술된 duplicate item 처리 규칙을 코드에 반영한다:
- 동일 name + category 조합의 항목 추가를 거부
- category가 다르면 동일 name이라도 허용
- 거부 시 콘솔 메시지 출력

## 구현 단계

| Step | 대상 | 내용 |
|---|---|---|
| 1 | `src/utils.js` | `isDuplicate(items, name, category)` 추가 및 export |
| 2 | `src/app.js` | `isDuplicate` import 추가 |
| 3 | `src/app.js` | `addItem()` 내 duplicate guard 추가 |
| 4 | `README.md` | stale claim 2개 수정 (구현과 병행 가능) |
| 5 | `docs/notes.md` | 구현 + 검증 완료 후 마지막에 수정 |

## Guard 순서 (`addItem()` 내부)

```
name validation → duplicate check → maxItems check → push
```

이유: invalid name에 불필요한 배열 순회 방지. capacity와 duplicate는 독립 관심사.

## 전제 조건 (구현 전 완료 필요)

아래 3건 보완 후 Step 1 시작:
1. `isDuplicate` 계약에 "`normalizeText` = 비교 전용, `formatItemName` = 저장 전용" 명시
2. `addItem()` 수정 단계에 `finalCategory` 계산 시점이 duplicate check **이전**임을 명시
3. 검증 케이스에 격리 조건 표기 또는 테스트 파일 추가 여부 결정
