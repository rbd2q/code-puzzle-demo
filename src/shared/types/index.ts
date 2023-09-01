export type TaskType = {
  id: number,
  initial_code: string,
  correct_code: string,
  blocks_to_select: string[]
}

export type CodeState = 'correct'| 'wrong' | 'not_executed';

export type SplitCode = {
  lineNumber: number
  lineCode: string,
}
