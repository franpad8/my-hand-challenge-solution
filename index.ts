



export function translate(str: string): string {
  const memory: number[] = new Array(30000).fill(0);
  let memory_pointer: number = 0;
  let output: string = '';

  const actions = {
    '👉': () => { memory_pointer++ },
    '👈': () => { memory_pointer-- },
    '👆': () => { memory[memory_pointer] = (memory[memory_pointer] < 255) ? memory[memory_pointer]+1 : 0},
    '👇': () => { memory[memory_pointer] = (memory[memory_pointer] > 0) ? memory[memory_pointer]-1 : 255},
    '👊': () => { output += String.fromCharCode(memory[memory_pointer])},
  }

  return str;
}

