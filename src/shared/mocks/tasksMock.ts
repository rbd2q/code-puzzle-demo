import type { Task } from "~/src/shared/types";

export const TASKS_MOCK: Task[] = [
  {
    id: 4,
    type: 'code-puzzle',
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
    id: 5,
    type: 'code-puzzle',
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
  },
  {
    id: 1,
    type: 'quiz',
    text: "Какой котик самый милый?",
    img: "https://oir.mobi/uploads/posts/2022-09/1662134055_1-oir-mobi-p-mnogo-kotikov-pinterest-2.jpg",
    answers: [
      {
        id: 1,
        img: "https://bipbap.ru/wp-content/uploads/2021/11/1619541010_52-oir_mobi-p-nyashnie-kotiki-zhivotnie-krasivo-foto-57.jpg"
      },
      {
        id: 2,
        img: "https://bipbap.ru/wp-content/uploads/2021/11/1619541014_19-oir_mobi-p-nyashnie-kotiki-zhivotnie-krasivo-foto-21.jpg"
      },
      {
        id: 3,
        img: "https://coolsen.ru/wp-content/uploads/2021/01/img_600d4719563e3.jpg"
      },
      {
        id: 4,
        img: "https://bipbap.ru/wp-content/uploads/2021/11/1583662531_38.jpg"
      },
    ],
    clarification_text: null,
    clarification_image: null,
    is_correct: null,
    correct_answer_id: null,
  },
  {
    id: 2,
    type: 'quiz',
    text: "WireShark - это",
    answers: [
      {
        id: 1,
        text: "Программа-брандмауер",
      },
      {
        id: 2,
        text: "Программа автоматического обнаружения атак",
      },
      {
        id: 3,
        text: "Программа для анализа безопасности удаленного устройства",
      },
      {
        id: 4,
        text: "Анализатор трафика в сетях",
      },
    ],
    clarification_text: null,
    clarification_image: null,
    is_correct: null,
    correct_answer_id: null,
  },
  {
    id: 3,
    type: 'quiz',
    text: "На каком языке написан код?",
    code: `
  setup(props) {
    const shareUrlLink = (platform: String) => {
      const url = props.shareUrl || window.location.href
      switch (platform) {
        case 'tw':
          return TW_BASE_SHARE_LINK + url
        case 'vk':
          return VK_BASE_SHARE_LINK + url
        case 'fb':
          return FB_BASE_SHARE_LINK + url
      }
    }
    return { shareUrlLink }
  },`,
    answers: [
      {
        id: 1,
        text: "Python",
      },
      {
        id: 2,
        text: "C++",
      },
      {
        id: 3,
        text: "JavaScript",
      },
      {
        id: 4,
        text: "Английский",
      },
    ],
    clarification_text: null,
    clarification_image: null,
    is_correct: null,
    correct_answer_id: null,
  }
]
