export interface CreateTaskInput {
  title?: string;
}

export function validateCreateTaskInput(input: CreateTaskInput): string | null {
  if (typeof input.title !== "string") {
    return "title is required";
  }

  if (input.title.trim().length === 0) {
    return "title must not be empty";
  }

  return null;
}

export function validatePatchTitleInput(input: unknown): string | null {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return "request body must be an object";
  }
  if (!("title" in input)) {
    return "title is required";
  }
  const { title } = input as Record<string, unknown>;
  if (typeof title !== "string") {
    return "title must be a string";
  }
  if (title.trim().length === 0) {
    return "title must not be empty";
  }
  return null;
}