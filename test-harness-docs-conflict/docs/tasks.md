# Tasks

_Last updated: 2026-03-13_

## 구현 전 완료 필요 (계획 보완)

- [ ] `isDuplicate` 계약 설명에 "`normalizeText` = 비교 전용, `formatItemName` = 저장 전용" 한 문장 추가
- [ ] `addItem()` 수정 단계에 `finalCategory` 계산이 duplicate check **이전**임을 명시
- [ ] 검증 케이스 격리 방법 결정: "초기 배열 상태에서 독립 실행" 조건 표기 또는 최소 테스트 파일 추가

## 구현 단계

- [ ] Step 1: `isDuplicate(items, name, category)` → `src/utils.js` 추가 및 export
- [ ] Step 2: `isDuplicate` → `src/app.js` import 추가
- [ ] Step 3: `addItem()` guard 추가 (name validation 후, maxItems 전)
- [ ] Step 4: `README.md` stale claim 2개 수정 (구현과 병행 가능)
- [ ] Step 5: 검증 완료 후 `docs/notes.md` 업데이트 (반드시 마지막)

## 선택적 항목

- [ ] category case-insensitive 채택 근거를 코드 주석에 남길지 결정
- [ ] 거부 메시지의 `name` 값이 raw input인지 `formatItemName` 처리 후 값인지 계획에 명시
