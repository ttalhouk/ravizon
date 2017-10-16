class OrdersList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      orders: [],
      fulfilled: false
    }
  }
  componentWillMount(){
    this.setState({orders: this.state.orders.concat(this.props.orders)});
  }
  removeOrder(id){
    console.log("removing: ", id);
    $.ajax({
      url: `/users/${this.props.user.id}/orders/${id}`,
      method: 'DELETE',
      context: this,
      dataType: 'json'
    })
      .success((data) => {
        // update messages
        window.flash_messages.addMessage({
          id: data.order.id,
          text: `Item was removed.`,
          type: 'success'
        });

        this.setState({
          orders: this.state.orders.filter((order) => {
            if(order.id !== data.order.id){
              return order
            }
          })
        });
        window.order_count.removeOrder();
      })
      .error((err) => {
        // give error messages
        // set quantity state back to original props value
        window.flash_messages.addMessage({
          id: err.responseJSON.order.id,
          text: err.responseJSON.messages,
          type: 'error'
        });
      });
  }

  updateQuantity(value, id){
    $.ajax({
      url: `/users/${this.props.user.id}/orders/${id}`,
      method: 'PATCH',
      data: {order: {qty: value}},
      context: this,
      dataType: 'json'
    })
      .success((data) => {
        // update messages
        window.flash_messages.addMessage({
          id: data.order.id,
          text: `Quantity updated.`,
          type: 'success'
        });
        //update quanity
        this.setState({orders: this.state.orders.map((order)=>{
          if(order.id === data.order.id){
            order.qty = data.order.qty
          }
          return order
        })})
      })
      .error((err) => {
        // give error messages
        // set quantity state back to original props value
        window.flash_messages.addMessage({
          id: err.responseJSON.qty,
          text: err.responseJSON.messages,
          type: 'error'
        });
        this.setState({
          orders: this.state.orders.map((order)=>{

            if(order.id === id){
              order.qty = err.responseJSON.qty
            }
            return order
          })
        });
      });
  }
  getProduct(id){
    return this.props.products.filter((product) => {
      return product.id === id;
    })[0]
  }
  renderOrders(){
    const filteredOrders = this.state.orders.filter((order) => {
      return order.fulfilled === this.state.fulfilled
    })
    if (filteredOrders.length > 0){
      return filteredOrders.map((order) => {
        return (
          <Order
            key={order.id}
            order={order}
            removeOrder={this.removeOrder.bind(this)}
            updateQuantity={this.updateQuantity.bind(this)}
            product={this.getProduct(order.product_id)}
            fulfilled={this.state.fulfilled}
            />
        )
      })
    } else {
      return (<div className='order-list--no-items'>
        No Items {this.state.fulfilled ? 'Purchased.' : "In Cart"}
      </div>)
    }
  }
  renderControls(){
    if (!this.state.fulfilled){
      return (
        <a
          href={`/users/${this.props.user.id}/orders/cart`}
          className="button button--order"
          >
          Proceed to Purchase
        </a>
      )
    }
  }
  renderGrandTotal(){
    let total = 0;
    this.state.orders.forEach((order) => {
      if (!order.fulfilled){
        total += order.qty * this.getProduct(order.product_id).price;
      }
    })
    if (!this.state.fulfilled){
      return (
        <div className="order-list--grand-total">
          Grand Total: {numeral(total).format('$0,0.00')}
        </div>);
    } else {
      return
    }

  }
  render () {
    const {user, orders} = this.props
    return (
      <div className="order-list">
        <div className="order-list--header">
          <h2 className="order-list--title">
            { `${user.email}'s ${!this.state.fulfilled ? 'Cart' : 'Order History' }` }
          </h2>
          <button
            className="button button--action"
            onClick={() => {this.setState({fulfilled: !this.state.fulfilled})}}
            >
            { this.state.fulfilled ? 'View Cart' : 'View Completed Orders' }
          </button>
        </div>
        <FlipMove
          className='order-list--showcase'
          duration={500}
          easing="ease-out">
          {this.renderOrders()}
        </FlipMove>
        <div className="order-list--purchase">
          {this.renderGrandTotal()}
          {this.renderControls()}
        </div>
      </div>
    );
  }
}

OrdersList.propTypes = {
  user: React.PropTypes.object,
  orders: React.PropTypes.array,
  products: React.PropTypes.array
};
