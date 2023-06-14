const MIN_CELL = 0;
const MAX_CELL = 255;

type Action = '👉' | '👈' | '👆' | '👇' | '👊' | '🤜' | '🤛'
type ActionTable = { 
  [key in Action]: () => void
}

export function translate(str: string): string {
  const memory: number[] = new Array(30000).fill(0);
  let memory_pointer: number = 0;
  let output: string = '';
  let str_index: number = 0;
  const getCurrentAction: () => Action = () => str.slice(str_index, str_index+2) as Action;
  const toNextAction: () => void = () => str_index += 2;
  const topreviousAction: () => void = () => str_index -= 2;
  const clamp: (num: number) => number = (num) => {
    if (num < MIN_CELL) return MAX_CELL
    if (num > MAX_CELL) return MIN_CELL
    return num
  };
  const jumpToNextFist: () => void = () => {
    let counter = 1;
    while (counter > 0) {
      toNextAction();
      if (getCurrentAction() === '🤜') {
        counter++;
      } else if (getCurrentAction() === '🤛') {
        counter--;
      }
    }
  }
  const jumpToPreviousFist: () => void = () => {
    let counter = 1;
    while (counter > 0) {
      topreviousAction();
      if (getCurrentAction() === '🤛') {
        counter++;
      } else if (getCurrentAction() === '🤜') {
        counter--;
      }
    }
  }

  const action_table: ActionTable = {
    '👉': ():void => { memory_pointer++ },
    '👈': ():void => { memory_pointer-- },
    '👆': ():void => { memory[memory_pointer] = clamp(memory[memory_pointer]+1) },
    '👇': ():void => { memory[memory_pointer] = clamp(memory[memory_pointer]-1) },
    '👊': ():void => { output += String.fromCharCode(memory[memory_pointer]) },
    '🤜': ():void => { if (memory[memory_pointer] === 0) jumpToNextFist() },
    '🤛': ():void => { if (memory[memory_pointer] !== 0) jumpToPreviousFist(); },
  }

  while (str_index < str.length) {
    const action = getCurrentAction();
    action_table[action as Action](); 
    toNextAction();
  }

  return output;
}

