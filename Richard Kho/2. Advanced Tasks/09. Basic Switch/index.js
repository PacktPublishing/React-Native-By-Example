class SwitchTest extends Component {
  constructor (props) {
    super (props);

    this.state = {
      toggled: false
    }
  }

  render () {
    return (
      <View>
        <Switch
          onValueChange={ (value) => { this._onValueChange(value) }}
          value={ this.state.toggled } />
      </View>
    )
  }

  _onValueChange (value) {
    this.setState({
      toggled: value
    })
  }
}
