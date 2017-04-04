import { getAsyncStorage } from '../utils/storageMethods';

const ADD_TASK = 'ADD_TASK';
const CHANGE_COMPLETION_STATUS = 'CHANGE_COMPLETION_STATUS';
const CHANGE_CURRENTLY_EDITED_TASK = 'CHANGE_CURRENTLY_EDITED_TASK';
const CHANGE_INPUT_TEXT = 'CHANGE_INPUT_TEXT';
const CHANGE_SELECTED_TASK_COMPLETED = 'CHANGE_SELECTED_TASK_COMPLETED';
const CHANGE_SELECTED_TASK_DUE_DATE = 'CHANGE_SELECTED_TASK_DUE_DATE';
const EDIT_SELECTED_TASK_NAME = 'EDIT_SELECTED_TASK_NAME';
const EXPAND_CELL = 'EXPAND_CELL';
const REMOVE_SELECTED_TASK_DUE_DATE = 'REMOVE_SELECTED_TASK_DUE_DATE';
const RESET_SELECTED_TASK = 'RESET_SELECTED_TASK';
const SAVE_SELECTED_TASK_DETAILS = 'SAVE_SELECTED_TASK_DETAILS';
const SET_LIST_OF_TASKS_AND_INDEX = 'SET_LIST_OF_TASKS_AND_INDEX';


export function addTask (text, currentIndex) {
  return {
    type: ADD_TASK,
    index: currentIndex,
    text
  }
}

export function changeCompletionStatus (index) {
  return {
    type: CHANGE_COMPLETION_STATUS,
    index
  }
}

export function changeCurrentlyEditedTask (selectedTaskObject) {
  return {
    type: CHANGE_CURRENTLY_EDITED_TASK,
    selectedTaskObject: selectedTaskObject
  }
}

export function changeInputText (text) {
  return {
    type: CHANGE_INPUT_TEXT,
    text
  }
}

export function changeSelectedTaskCompleted (value) {
  return {
    type: CHANGE_SELECTED_TASK_COMPLETED,
    value
  }
}

export function changeSelectedTaskDueDate (date) {
  return {
    type: CHANGE_SELECTED_TASK_DUE_DATE,
    date
  }
}

export function editSelectedTaskName (text) {
  return {
    type: EDIT_SELECTED_TASK_NAME,
    text
  }
}

export function expandCell (currentlyExpanded) {
  return {
    type: EXPAND_CELL,
    expanded
  }
}

export function getListOfTasksAndIndex () {
  return async (dispatch) => {
    let response = await getAsyncStorage();

    dispatch(setListOfTasksAndIndex(response, response.length));
  }
}

export function resetSelectedTask () {
  return {
    type: RESET_SELECTED_TASK
  }
}

export function removeSelectedTaskDueDate () {
  return {
    type: REMOVE_SELECTED_TASK_DUE_DATE
  }
}

export function saveSelectedTaskDetails (object) {
  return {
    type: SAVE_SELECTED_TASK_DETAILS,
    completed: object.completed,
    date: object.due || undefined,
    formattedDate: object.formattedDate || undefined,
    index: object.index,
    text: object.text
  }
}

function setListOfTasksAndIndex (listOfTasks, index) {
  return {
    type: SET_LIST_OF_TASKS_AND_INDEX,
    index,
    listOfTasks,
  }
}