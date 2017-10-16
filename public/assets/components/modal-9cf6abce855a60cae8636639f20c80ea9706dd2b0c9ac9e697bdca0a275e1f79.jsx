class Modal extends React.Component {
  render() {
    if (this.props.isOpen === false){
      return null
    }

    return (
      <div
        className="product-modal">
        <div
          className="product-modal--window" >
          {this.props.children}
        </div>
        <div
          className="product-modal--backdrop"
          onClick={this.props.onClose()}>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  isOpen: React.PropTypes.bool,
  onClose: React.PropTypes.func
};
