class Cart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count: props.orderCount
    };

    window.order_count = this;
  }
  addOrder(){
    this.setState({count: this.state.count + 1})
  }
  removeOrder(){
    this.setState({count: this.state.count - 1})
  }
  renderCount(){
    if (this.state.count > 0){
      return(
        <div className='cart--count'>
          {this.state.count}
        </div>
      );
    } else {
      return undefined;
    }
  }
  render () {
    return (
      <div className='cart'>
        <a
          className='cart--icon'
          href={`/users/${this.props.user}/orders`}
          >
          <i className='ion-bag' alt="cart"></i>
        </a>
        {this.renderCount()}
      </div>
    );
  }
}

Cart.propTypes = {
  orderCount: React.PropTypes.number,
  user: React.PropTypes.number
};
