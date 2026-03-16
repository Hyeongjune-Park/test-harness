# Decisions

_Last updated: 2026-03-13_
_포함 기준: 두 리뷰 통과 + 충돌 없는 확정 결정만. 충돌 중인 사항은 risks.md 참조._

## isDuplicate 함수 위치

`src/utils.js`에 추가하고 export한다.

**근거:** 기존 유틸리티 패턴(`normalizeText`, `formatItemName`, `isValidItemName`)과 일관성 유지.

---

## Guard 순서

`addItem()` 내부 순서: **name validation → duplicate check → maxItems → push**

**근거:** invalid name에 불필요한 배열 순회 방지. capacity와 duplicate는 독립 관심사이므로 순서가 기능에 영향 없음.

---

## name 비교 방식

`normalizeText(name)` 사용 (trim + lowercase). `formatItemName`은 저장 전용으로만 사용.

**근거:** `formatItemName` = trim only이므로, `normalizeText` 양쪽 적용 시 비교 결과 동일. 역할 혼용 방지.

---

## category 비교 방식

case-insensitive (lowercase). `spec.md`가 정확한 비교 방식을 지정하지 않으므로 name 처리와 일관성 위해 채택.

---

## 거부 메시지 형식

```
"Duplicate item: " + name + " in category " + finalCategory
```

**근거:** `spec.md`는 정확한 문구를 지정하지 않음. 제안값 채택.

---

## config 변경 없음

중복 규칙은 고정 동작으로 구현. `config.js`에 관련 키 추가 불필요.

---

## docs/notes.md 수정 시점

코드 검증 완료 후 마지막에 수정. 구현 단계와 동시에 수정하지 않는다.
