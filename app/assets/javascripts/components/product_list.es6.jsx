class ProductList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchTerm: ''
    }
  }
  componentWillMount() {

  }

  handleSearch(e){
    const searchTerm = e.target.value;
    this.setState({searchTerm: searchTerm});
  }

  renderProduct() {
    let filteredProducts = this.props.products
      .filter((product) => {
        return product.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1 || product.description.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1
      });
    if (filteredProducts.length > 0){
      return filteredProducts.map((product) => {
        return (
          <Product
            key={product.id}
            product={product}
            />
        )
      })
    } else {
      return (
        <div>
          <h2 className="no-product">No Products Match the Search Criteria</h2>
        </div>
      )
    }
  }

  render () {

    return (
      <div className='product--list'>
        <div className='product-list--header'>
          <h2 className='product-list--title'>Available Products</h2>
          <SearchBar
          handleSearch={() => this.handleSearch.bind(this)} searchTerm={this.state.searchTerm} />
        </div>

        <FlipMove
          className='product-list--showcase'
          duration={500}
          easing="ease-out">
          {this.renderProduct()}
        </FlipMove>

      </div>
    );
  }
}

ProductList.propTypes = {
  products: React.PropTypes.array
};
