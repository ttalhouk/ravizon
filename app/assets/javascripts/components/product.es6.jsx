class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
  }

  openModal() {
    this.setState({isModalOpen: true});
  }

  closeModal() {
    this.setState({isModalOpen: false});
  }

  handleAddToCart() {
    // ajax request to orders for user
    $.ajax({
      url: '/orders',
      method: 'POST',
      data: {product: this.props.product.id},
      context: this,
      dataType: 'json'
    })
      .success((data) => {
        window.flash_messages.addMessage({
          id: data.order.id,
          text: `${this.props.product.name} successfully added to cart`,
          type: 'success'
        });
        window.order_count.addOrder();

        this.closeModal();
      })
      .error((err) => {
        if (err.status === 401){
          window.location.replace("/users/sign_in");
          window.flash_messages.addMessage({
            id: err.responseJSON.error,
            text: err.responseJSON.error,
            type: 'error'
          });
        } else {
          window.flash_messages.addMessage({
            id: err.responseJSON.messages,
            text: err.responseJSON.messages,
            type: 'error'
          });
          this.closeModal();
        }
      })
  }
  renderLimitedQty(stock) {
    if (stock < 10) {
      return (
        <div className='product-list--item-qty'>
          {`Only ${stock} left!`}
        </div>
      )
    }
  }

  render () {
    const {id, name, description, stock, url} = this.props.product
    const price = numeral(this.props.product.price).format('$0,0.00')
    return (
      <div className= "product-list--item">
        <div onClick={this.openModal.bind(this)} className="product-list--item-link">
          <h2>{name}</h2>
          <img src={url} alt={`${name} image`}/>
          {this.renderLimitedQty(stock)}
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
            <img
              className="product-modal--image"
              src={url}
              alt={`${name} image`}/>
            <div className="product-modal--details">
              <h2>{name}</h2>
              <p>{_.truncate(description,{'length': 200, 'seperator': ' '})}</p>
              <p>Qty in Stock: {stock}</p>
              <p>{price}</p>
            </div>
            <div className="product-modal--controls">
              <button
                onClick={this.handleAddToCart.bind(this)}
                className='button button--order'>
                Add to Cart
              </button>
              <a
                className='button button--link'
                href={`/products/${id}`}>Product Details</a>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

Product.propTypes = {
  product: React.PropTypes.object
};
