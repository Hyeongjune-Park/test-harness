# Task API Spec

## Current Public API

### POST /tasks
Creates a new task.

Request body:
```json
{ "title": "Buy milk" }
```

Response:
```json
{
  "id": "t_1",
  "title": "Buy milk",
  "completed": false
}
```

### GET /tasks
Returns all tasks.

Response:
```json
[
  {
    "id": "t_1",
    "title": "Buy milk",
    "completed": false
  }
]
```

## Constraints

- `title` is required.
- Empty or missing title should return 400.

## Out of Scope

- Persistence
- Authentication
- Filtering
- Update endpoints