# Product Spec

## Intended behavior
- Users can add items with `addItem(name, category)`
- Search is available and should match item names case-insensitively
- Duplicate items are allowed only when the category is different
- Duplicate detection should compare `name + category`
- Duplicate rejections should print a clear console message

## Notes
This document is intended to describe the desired product behavior, not necessarily the current implementation.