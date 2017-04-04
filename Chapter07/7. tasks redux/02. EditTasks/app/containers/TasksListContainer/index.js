import { connect } from 'react-redux';

import {
  addTask,
  changeCompletionStatus,
  changeCurrentlyEditedTask,
  changeInputText,
  expandCell,
  resetSelectedTask,
  saveSelectedTaskDetails
} from '../../actions';

import TasksList from '../../components/TasksList';

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (text) => {
      dispatch(addTask(text));
    },
    changeCurrentlyEditedTask: (selectedTaskObject) => {
      dispatch(changeCurrentlyEditedTask(selectedTaskObject));
    },
    changeCompletionStatus: (index) => {
      dispatch(changeCompletionStatus(index));
    },
    onChangeText: (text) => {
      dispatch(changeInputText(text));
    },
    resetSelectedTask: () => {
      dispatch(resetSelectedTask());
    },
    saveSelectedTaskDetails: (selectedTaskObject) => {
      dispatch(saveSelectedTaskDetails(selectedTaskObject));
    }
  }
}

const mapStateToProps = (state, { navigator }) => {
  return {
    date: state.date,
    formattedDate: state.formattedDate,
    listOfTasks: state.listOfTasks,
    navigator: navigator,
    selectedTaskObject: state.selectedTaskObject,
    text: state.text
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
