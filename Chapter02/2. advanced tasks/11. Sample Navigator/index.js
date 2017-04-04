class Tasks extends Component {
  render () {
    const routes = [
      { title: 'Tasks List', index: 0 },
      { title: 'Edit Task', index: 1 }
    ];

    return (
      <Navigator
        initialRoute={{ index: 0 }}
        renderScene={ (routes, navigator) => this._renderScene(routes, navigator) } />
    )
  }

  _renderScene (route, navigator) {
    if (route.index === 0) {
      return (
        <TasksList
          title={ route.title }
          navigator={ navigator } />
      )
    }

    if (route.index === 1) {
      return (
        <EditTask
         navigator={ navigator }
         details={ route.passProps.details } />
      )
    }
  }
}