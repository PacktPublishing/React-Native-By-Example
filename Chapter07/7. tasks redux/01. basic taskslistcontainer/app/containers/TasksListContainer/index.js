import { connect } from 'react-redux';

import {
  addTask,
  changeCompletionStatus,
  changeInputText,
} from '../../actions';

import TasksList from '../../components/TasksList';

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (text) => {
      dispatch(addTask(text));
    },
    changeCompletionStatus: (index) => {
      dispatch(changeCompletionStatus(index));
    },
    onChangeText: (text) => {
      dispatch(changeInputText(text));
    }
  }
}

const mapStateToProps = (state, { navigator }) => {
  return {
    listOfTasks: state.listOfTasks,
    navigator: navigator,
    text: state.text
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
