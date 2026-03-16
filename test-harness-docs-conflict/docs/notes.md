# Developer Notes

## Known weaknesses
- Search exists but is very basic
- No duplicate item check
- Validation is minimal
- Item IDs are generated from array length
- Rendering is console-based and tightly coupled to app logic

## Intentional test points
This project is designed to create mild contradictions between docs and code so that planning and review workflows must separate:
- confirmed current behavior
- intended behavior
- stale notes