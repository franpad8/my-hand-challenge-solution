"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const MIN_CELL = 0;
const MAX_CELL = 255;
function translate(str) {
    const memory = new Array(30000).fill(0);
    let memory_pointer = 0;
    let output = '';
    let str_index = 0;
    const getCurrentAction = () => str.slice(str_index, str_index + 2);
    const toNextAction = () => str_index += 2;
    const topreviousAction = () => str_index -= 2;
    const clamp = (num) => {
        if (num < MIN_CELL)
            return MAX_CELL;
        if (num > MAX_CELL)
            return MIN_CELL;
        return num;
    };
    const jumpToNextFist = () => {
        let counter = 1;
        while (counter > 0) {
            toNextAction();
            if (getCurrentAction() === '🤜') {
                counter++;
            }
            else if (getCurrentAction() === '🤛') {
                counter--;
            }
        }
    };
    const jumpToPreviousFist = () => {
        let counter = 1;
        while (counter > 0) {
            topreviousAction();
            if (getCurrentAction() === '🤛') {
                counter++;
            }
            else if (getCurrentAction() === '🤜') {
                counter--;
            }
        }
    };
    const action_table = {
        '👉': () => { memory_pointer++; },
        '👈': () => { memory_pointer--; },
        '👆': () => { memory[memory_pointer] = clamp(memory[memory_pointer] + 1); },
        '👇': () => { memory[memory_pointer] = clamp(memory[memory_pointer] - 1); },
        '👊': () => { output += String.fromCharCode(memory[memory_pointer]); },
        '🤜': () => { if (memory[memory_pointer] === 0)
            jumpToNextFist(); },
        '🤛': () => { if (memory[memory_pointer] !== 0)
            jumpToPreviousFist(); },
    };
    while (str_index < str.length) {
        const action = getCurrentAction();
        action_table[action]();
        toNextAction();
    }
    return output;
}
exports.translate = translate;
