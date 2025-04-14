export const LIST_TYPES = {
  GENERAL: 'General',
  TASK: 'Task',
  SHOPPING: 'Shopping',
  // Add more types as needed
} as const; // Use 'as const' for stricter type checking

// Extract type values for use in Zod enums or component props
export type ListTypeValue = (typeof LIST_TYPES)[keyof typeof LIST_TYPES];

// Create an array of type objects useful for Select components
export const listTypeOptions = Object.entries(LIST_TYPES).map(
  ([key, label]) => ({
    value: key, // e.g., 'GENERAL'
    label: label, // e.g., 'General'
  })
);
