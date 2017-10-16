class Order extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      updatedQuantity: this.props.order.qty,
      isModalOpen: false
    }
  }

  componentWillReceiveProps(){
    this.setState({updatedQuantity: this.props.order.qty });
  }

  changeQuantity(e){
    this.setState({updatedQuantity: e.target.value});
  }

  handleQuantityChange(e){
    e.preventDefault();
    if(this.state.updatedQuantity !== this.props.order.qty){
      this.props.updateQuantity(this.state.updatedQuantity, this.props.order.id);
    }
  }
  handleRemoveItem(){
    this.closeModal();
    this.props.removeOrder(this.props.order.id);
  }

  closeModal() {
    this.setState({isModalOpen: false});
  }
  renderSubtotal(){
    let total = this.state.updatedQuantity * this.props.product.price;
    return numeral(total).format('$0,0.00');
  }
  renderQty(){
    if (!this.props.fulfilled) {
      return(
        <form
          className="order-list--item-form"
          onSubmit={this.handleQuantityChange.bind(this)}>
          <input
            className="order-list--item-qty"
            type='number'
            value={this.state.updatedQuantity}
            onChange={this.changeQuantity.bind(this)}
            onMouseLeave={this.handleQuantityChange.bind(this)}
            onBlur={this.handleQuantityChange.bind(this)}
            min="1"
            max={this.props.product.stock}/>
        </form>
      )
    } else {
      return(
        <span className="order-list--item-final-qty">
          {this.state.updatedQuantity}
        </span>

      )
    }

  }
  renderRemoveButton(){
    if (!this.props.fulfilled) {
      return(
        <i
          className="ion-android-cancel order-list--item-remove"
          onClick={() => {this.setState({isModalOpen: true})}}
          >
        </i>
      )
    }
  }
  render () {
    const {order, product} = this.props;
    return (
      <div className='order-list--item'>
        <div className='order-list--item-details'>
          <h3>{product.name}</h3>
          <p>added on: {moment(order.created_at).format("MMMM Do YYYY")}</p>
        </div>
        <div className='order-list--item-controls'>
          <span className="order-list--item-price">
            {numeral(product.price).format('$0,0.00')} x
          </span>
          {this.renderQty()}
          <span className="order-list--item-subtotal">
              = {this.renderSubtotal()}
          </span>
          {this.renderRemoveButton()}

        </div>
        <Modal
          isOpen={this.state.isModalOpen}
          onClose={() => this.closeModal.bind(this)}>
          <div
            onClick={this.closeModal.bind(this)}
            className="product-modal--close-button">
            <i className="ion-close"></i>
          </div>
          <div className="product-modal--content">
            <div className="product-modal--details">
              <h3>Are you sure you want to delete {product.name}?</h3>
            </div>
            <div className="product-modal--controls">
              <button
                onClick={this.handleRemoveItem.bind(this)}
                className='button button--remove'>
                Remove {product.name}
              </button>
            </div>
          </div>
        </Modal>

      </div>
    );
  }
}

Order.propTypes = {
  order: React.PropTypes.object,
  product: React.PropTypes.object,
  removeOrder: React.PropTypes.func,
  updateQuantity: React.PropTypes.func,
  fulfilled: React.PropTypes.bool
};
