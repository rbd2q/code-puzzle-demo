import type { TaskType } from "~/src/shared/types";

export const TASKS_MOCK: TaskType[] = [
  {
    id: 1,
    initial_code: `export const formatDurationWithLabels = (totalSeconds: number | undefined): string => {
  if (!SLOT_FOR_CODE_BLOCK) {
    return '0';
  }

  totalSeconds = Math.floor(totalSeconds);
  if (totalSeconds < 0) {
    totalSeconds = 0;
  }

  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = SLOT_FOR_CODE_BLOCK;

  const durationParts: string[] = [];
  if (hours > 0) {
    durationParts.push(SLOT_FOR_CODE_BLOCK);
  }
  if (hours > 0 || minutes > 0) {
    durationParts.push(SLOT_FOR_CODE_BLOCK);
  }
  durationParts.push(SLOT_FOR_CODE_BLOCK);

  SLOT_FOR_CODE_BLOCK SLOT_FOR_CODE_BLOCK;
};`,
    correct_code: `export const formatDurationWithLabels = (totalSeconds: number | undefined): string => {
  if (!first code) {
    return '0';
  }

  totalSeconds = Math.floor(totalSeconds);
  if (totalSeconds < 0) {
    totalSeconds = 0;
  }

  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = second code;

  const durationParts: string[] = [];
  if (hours > 0) {
    durationParts.push(third code);
  }
  if (hours > 0 || minutes > 0) {
    durationParts.push(Math.floor(totalSeconds / 3600));
  }
  durationParts.push(hours > 0 || minutes > 0);

  return durationParts.join(\' \');
};`,
    blocks_to_select: ['first code', 'second code', 'third code', 'Math.floor(totalSeconds / 3600)', 'hours > 0 || minutes > 0', 'return', 'durationParts.join(\' \')'],
  },
  {
    id: 2,
    initial_code: `/**
 * Implement function getResult
 */
function getResult(expr) {
    const results = [];

  // Helper function to evaluate the expression
  function evaluate(left, right, operator) {
    switch (operator) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
    }
  }

  // Recursive function to compute all possible results
  function computeResults(start, end) {
    const currentResults = [];

    for (let i = start; i <= end; i++) {
      const char = expr[i];

      if (char === '+' || char === '-' || char === '*') {
        const SLOT_FOR_CODE_BLOCK = computeResults(start, i - 1);
        const SLOT_FOR_CODE_BLOCK = computeResults(i + 1, end);

        for (const left of leftResults) {
          for (const right of rightResults) {
            currentResults.push(evaluate(left, right, char));
          }
        }
      }
    }

    if (currentResults.length === 0) {
      // No operators found, single number
      const num = parseInt(expr.slice(start, end + 1));
      currentResults.push(num);
    }

    return currentResults;
  }

  results.push(...computeResults(0, expr.length - 1));
  results.sort((a, b) => a - b); // Sort results in ascending order

  return results;
}`,
    correct_code: `/**
 * Implement function getResult
 */
function getResult(expr) {
    const results = [];

  // Helper function to evaluate the expression
  function evaluate(left, right, operator) {
    switch (operator) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
    }
  }

  // Recursive function to compute all possible results
  function computeResults(start, end) {
    const currentResults = [];

    for (let i = start; i <= end; i++) {
      const char = expr[i];

      if (char === '+' || char === '-' || char === '*') {
        const leftResults = computeResults(start, i - 1);
        const rightResults = computeResults(i + 1, end);

        for (const left of leftResults) {
          for (const right of rightResults) {
            currentResults.push(evaluate(left, right, char));
          }
        }
      }
    }

    if (currentResults.length === 0) {
      // No operators found, single number
      const num = parseInt(expr.slice(start, end + 1));
      currentResults.push(num);
    }

    return currentResults;
  }

  results.push(...computeResults(0, expr.length - 1));
  results.sort((a, b) => a - b); // Sort results in ascending order

  return results;
}`,
    blocks_to_select: ['leftResults', 'rightResults']
  }
]
