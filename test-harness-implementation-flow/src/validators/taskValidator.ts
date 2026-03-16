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