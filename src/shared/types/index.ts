export type TaskTypeEnum = 'quiz' | 'code-puzzle'

export type QuizTaskAnswer = {
  id: number,
  text?: string
  img?: string
}

export type Task = {
  id: number,
  type: TaskTypeEnum,
  text?: string,
  code?: string,
  img?: string,
  answers?: QuizTaskAnswer[]
  clarification_text?: string | null,
  clarification_image?: string | null,
  is_correct?: boolean | null,
  correct_answer_id?: number | null,
  initial_code?: string,
  correct_code?: string,
  blocks_to_select?: string[]
}

export type CodeState = 'correct'| 'wrong' | 'not_executed';

export type SplitCode = {
  lineNumber: number
  lineCode: string,
}
