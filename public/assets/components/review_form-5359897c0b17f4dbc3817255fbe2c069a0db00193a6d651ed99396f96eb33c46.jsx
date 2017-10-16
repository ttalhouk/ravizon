class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: 5,
      body: '',
      title: ''
    }
  }

  handleFormSubmit(e){
    e.preventDefault();
    this.props.handleSubmit({
      rating: this.state.stars,
      title: this.state.title,
      body: this.state.body
    })
  }
  handleStarClick(e){
    let stars = e.target.getAttribute('data-star');
    this.setState({stars})

  }
  setStarClass(index){
    if(index <= this.state.stars) {
      return "ion-android-star";
    }
    return "ion-android-star-outline";
  }
  renderStars(){
    let starList = [];
    for(let i = 1; i <= 5; i++){
      starList.push(<i
        key={i}
        className={`review--star ${this.setStarClass(i)}`}
        onClick={this.handleStarClick.bind(this)
        }
        data-star={i}
        >
      </i>)
    }
    return starList

  }

  render () {
    return (
      <div className={`review--form ${this.props.openForm ? "open": "closed"}`}>
        <p>If you own this product, please leave us a review!</p>
        <form
          className="review--form__container"
          onSubmit={this.handleFormSubmit.bind(this)}>
          <label htmlFor="title">
            Title:
            <input
              onChange={(e)=> {this.setState({title: e.target.value})}}
              id='title'
              className="review--input"
              value={this.state.title}
              />
          </label>
          <label htmlFor="body">
            Body:
            <textarea
              onChange={(e)=> {this.setState({body: e.target.value})}}
              id='title'
              className="review--textarea"
              value={this.state.body}
              />
          </label>
          <div className='review--stars'>
            {this.renderStars()}
          </div>

          <button type='Submit' className='button button--link'>Submit Review</button>
        </form>
      </div>
    );
  }
}

ReviewForm.propTypes = {
  handleSubmit: React.PropTypes.func
};
