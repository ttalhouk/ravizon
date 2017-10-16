class SearchBar extends React.Component {

  render () {
    return (
      <input
        className='search-bar'
        type='search'
        onChange={this.props.handleSearch()}
        value={this.props.searchTerm}
        placeholder='search' />
    )
  }
}

SearchBar.propTypes = {
  searchTerm: React.PropTypes.string,
  handleSearch: React.PropTypes.func
};
