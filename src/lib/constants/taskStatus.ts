export const TASK_STATUS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  // Add more statuses as needed (e.g., BLOCKED, REVIEW)
} as const;

export type TaskStatusValue = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

// Array of status objects for UI elements like Selects or filters
export const taskStatusOptions = Object.entries(TASK_STATUS).map(
  ([key, label]) => ({
    value: key, // e.g., 'TODO'
    label: label, // e.g., 'To Do'
  })
);
