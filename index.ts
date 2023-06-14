


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

  const action_table: ActionTable = {
    '👉': ():void => { memory_pointer++ },
    '👈': ():void => { memory_pointer-- },
    '👆': ():void => { memory[memory_pointer] = (memory[memory_pointer] < 255) ? memory[memory_pointer]+1 : 0},
    '👇': ():void => { memory[memory_pointer] = (memory[memory_pointer] > 0) ? memory[memory_pointer]-1 : 255},
    '👊': ():void => { output += String.fromCharCode(memory[memory_pointer])},
    '🤜': ():void => {
      if (memory[memory_pointer] === 0) {
        let counter = 1;
        while (counter > 0) {
          str_index += 2;
          if (getCurrentAction() === '🤜') {
            counter++;
          } else if (getCurrentAction() === '🤛') {
            counter--;
          }
        }
      }
    },
    '🤛': ():void => {
      if (memory[memory_pointer] !== 0) {
        let counter = 1;
        while (counter > 0) {
          str_index -= 2;
          if (getCurrentAction() === '🤛') {
            counter++;
          } else if (getCurrentAction() === '🤜') {
            counter--;
          }
        }
      }
    },
  }

  while (str_index < str.length) {
    const action = getCurrentAction();
    action_table[action as Action](); 
    str_index += 2;
  }

  return output;
}

