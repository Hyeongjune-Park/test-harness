# Playground Notes

## Known weaknesses

- No real separation between app logic and data storage
- Search exists but is very basic
- No duplicate item check
- Validation is minimal
- Rendering is console-based and tightly coupled to logic
- Error handling is inconsistent
- Item IDs are generated from array length

## Intentional test points

This project is designed to give planner/reviewer agents something to analyze.

Expected things they may notice:
- small but non-trivial feature scope
- weak validation
- hardcoded assumptions
- refactoring opportunities
- possible edge cases around search and item creation