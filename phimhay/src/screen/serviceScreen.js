_onRefresh = () => {
  const data = {
      'storeId': get(storeService.getSpecificState(nameOfStoreDetailReducers), 'storeId'),
      callback: () => {
          console.log(this.props, this.state)
          this.setState({
              serviceData: [...this.props.serviceData],
          })
      }
  }
  this.props.actions.fetchServiceRequest(data);
}

const mapStateToProps = (state, ownProps) => {
  return {
      ...state[nameOfServiceReducers],
      ...state[nameOfLoadingReducers][serviceActions.FETCH_SERVICE],
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      actions: bindActionCreators(serviceActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceTab)