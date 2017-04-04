import { connect } from 'react-redux';

import {
  changeSelectedTaskCompleted,
  changeSelectedTaskDueDate,
  editSelectedTaskName,
  expandCell,
  removeSelectedTaskDueDate,
  resetSelectedTask,
  saveSelectedTaskDetails
} from '../../actions';

import EditTask from '../../components/EditTask';

const mapDispatchToProps = (dispatch) => {
  return {
    changeCompletedStatus: (value) => {
      dispatch(changeSelectedTaskCompleted(value));
    },
    changeTextInputValue: (text) => {
      dispatch(editSelectedTaskName(text))
    },
    clearDate: () => {
      dispatch(removeSelectedTaskDueDate());
    },
    onDateChange: (date) => {
      dispatch(changeSelectedTaskDueDate(date));
    },
    onExpand: (currentlyExpanded) => {
      dispatch(expandCell(currentlyExpanded))
    },
    resetSelectedTask: () => {
      dispatch(resetSelectedTask());
    },
    saveSelectedTaskDetails: (selectedTaskObject) => {
      dispatch(saveSelectedTaskDetails(selectedTaskObject));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    date: state.date,
    dateSelected: state.dateSelected,
    expanded: state.expanded,
    formattedDate: state.formattedDate,
    selectedTaskObject: state.selectedTaskObject,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
