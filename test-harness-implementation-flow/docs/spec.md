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

### PATCH /tasks/:id/title
Updates the title of an existing task.

Request:
- Path param: `id` (string)
- Body: `{ "title": "new title" }`

Response 200:
```json
{ "id": "t_1", "title": "new title", "completed": false }
```

Response 400 (validation failure):
```json
{ "error": "title is required | title must be a string | title must not be empty | request body must be an object" }
```

Response 404 (task not found):
```json
{ "error": "task not found" }
```

## Out of Scope

- Persistence
- Authentication
- Filtering
