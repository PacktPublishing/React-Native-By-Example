const defaultState = {
  date: undefined,
  dateSelected: false,
  expanded: false,
  formattedDate: undefined,
  listOfTasks: [],
  selectedTaskObject: undefined,
  text: '',
}

const _formatDate = (date) => {
  if (date) {
    return date.toDateString() + ' ' + date.toLocaleTimeString(navigator.language, { hour:'2-digit', minute:'2-digit'});
  }
}

const singleTask = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        completed: false,
        due: undefined,
        formattedDate: undefined,
        text: action.text
      }
    case 'CHANGE_COMPLETION_STATUS':
      if (state.index !== action.index) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      }
    case 'SAVE_SELECTED_TASK_DETAILS':
      if (state.index !== action.index) {
        return state;
      }
      return {
        ...state,
        completed: action.completed,
        due: action.date,
        formattedDate: action.formattedDate,
        text: action.text
      }
    default:
      return state;
  }
}

const selectedTask = (state = {}, action) => {
  switch(action.type) {
    case 'CHANGE_SELECTED_TASK_COMPLETED':
      return {
        ...state,
        completed: action.value
      }
    case 'CHANGE_SELECTED_TASK_DUE_DATE':
      return {
        ...state,
        due: action.date || undefined,
        formattedDate: action.date ? _formatDate(action.date) : undefined
      }
    case 'EDIT_SELECTED_TASK_NAME':
      return {
        ...state,
        text: action.text
      }
    case 'REMOVE_SELECTED_TASK_DUE_DATE':
      return {
      ...state,
      due: undefined,
      formattedDate: undefined
      }
    default:
      return state;
  }
}


const listOfTasks = (state = defaultState, action) => {
  switch(action.type) {
    case 'ADD_TASK':
      const newListOfTasks = [...state.listOfTasks, singleTask({}, action)];
      return {
        ...state,
        listOfTasks: newListOfTasks,
        text: ''
      }
    case 'CHANGE_COMPLETION_STATUS':
      return {
        ...state,
        listOfTasks: state.listOfTasks.map((element) => {
            return singleTask(element, action);
          })
      }
    case 'CHANGE_CURRENTLY_EDITED_TASK':
      const date = action.selectedTaskObject.due || new Date();
      const formattedDate = _formatDate(date);

      const hasDueDate = action.selectedTaskObject.due ? true : false
      return {
        ...state,
        date: date,
        dateSelected: hasDueDate,
        formattedDate: formattedDate,
        selectedTaskObject: action.selectedTaskObject
      }
    case 'CHANGE_INPUT_TEXT':
      return {
        ...state,
        text: action.text
      }
    case 'CHANGE_SELECTED_TASK_COMPLETED':
      return {
        ...state,
        selectedTaskObject: selectedTask(state.selectedTaskObject, action)
      }
    case 'CHANGE_SELECTED_TASK_DUE_DATE':
      return {
        ...state,
        date: action.date,
        dateSelected: action.date ? true : false,
        formattedDate: action.date ? _formatDate(action.date) : undefined,
        selectedTaskObject: selectedTask(state.selectedTaskObject, action)
      }
    case 'EDIT_SELECTED_TASK_NAME':
      return {
        ...state,
        selectedTaskObject: selectedTask(state.selectedTaskObject, action)
      }
    case 'EXPAND_CELL':
      return {
        ...state,
        expanded: !action.expanded
      }
    case 'RESET_SELECTED_TASK':
      return {
        ...state,
        expanded: false,
        selectedTask: undefined,
      }
    case 'REMOVE_SELECTED_TASK_DUE_DATE':
      return {
        ...state,
        dateSelected: false,
        selectedTaskObject: selectedTask(state.selectedTaskObject, action)
      }
    case 'SAVE_SELECTED_TASK_DETAILS':
      return {
        ...state,
        expanded: false,
        listOfTasks: state.listOfTasks.map((element) => {
            return singleTask(element, action)
          })
      }
    default:
      return state;
  }
}

export default listOfTasks;