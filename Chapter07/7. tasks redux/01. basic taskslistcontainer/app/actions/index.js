let currentIndex = 0;

const ADD_TASK = 'ADD_TASK';
const CHANGE_COMPLETION_STATUS = 'CHANGE_COMPLETION_STATUS';
const CHANGE_INPUT_TEXT = 'CHANGE_INPUT_TEXT';

export function addTask (text) {
  return {
    type: ADD_TASK,
    index: currentIndex++,
    text
  }
}

export function changeCompletionStatus (index) {
  return {
    type: CHANGE_COMPLETION_STATUS,
    index
  }
}
export function changeInputText (text) {
  return {
    type: CHANGE_INPUT_TEXT,
    text
  }
}
