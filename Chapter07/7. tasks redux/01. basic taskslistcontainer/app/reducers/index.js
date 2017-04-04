const singleTask = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_TASK':
      return {
        completed: false,
        due: undefined,
        formattedDate: undefined,
        index: action.index,
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
    default:
      return state;
  }
}

let defaultState = {
  listOfTasks: [],
  text: '',
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
    case 'CHANGE_INPUT_TEXT':
      return {
        ...state,
        text: action.text
      }
    default:
      return state;
  }
}

export default listOfTasks;