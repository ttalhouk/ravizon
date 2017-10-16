class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openForm:false,
      reviews: []
    }
  }
  componentWillMount(){
    this.setState({reviews: this.props.reviews})

  }

  handleFormSubmit(reviewData) {
    console.log(reviewData);

    // ajax request to review create route
    $.ajax({
      url: `/products/${this.props.product.id}/reviews`,
      method: 'POST',
      dataType: 'json',
      data: {review: reviewData},
      context: this
    })
      .success((data) => {
        // this.props.updateMessage({success: `review successfully added`})
        console.log(data);
        this.setState({reviews: [data.review].concat(this.state.reviews)})
        this.handleOpenForm();
      })
      .error((err) => {
        if (err.responseJSON.redirect){
          window.location.replace(err.responseJSON.redirect)
        } else {
          console.log(err.responseJSON);
        }
      })
  }

  renderReviews() {
    return this.state.reviews.map((review) => {
      return(
        <Review key={review.id} review={review} user={this.props.user} />
      );
    });
  }

  renderReviewForm() {
    return (
      <ReviewForm
        handleSubmit={this.handleFormSubmit.bind(this)}
        openForm={this.state.openForm}
        />
    )
  }

  handleOpenForm(){
    this.setState({openForm: !this.state.openForm});
  }


  render () {
    return (
      <div className='page--review-section'>
        <div className='review'>
          <button
            onClick={this.handleOpenForm.bind(this)}
            className="button button--action">
            {this.state.openForm ? "Close" : "Leave a Review"}
          </button>

          {this.renderReviewForm()}
          <FlipMove
            className='review-list'
            duration={500}
            easing="ease-out"
            >
            {this.renderReviews()}
          </FlipMove>
        </div>
      </div>
    );
  }
}

ReviewList.propTypes = {
  product: React.PropTypes.object,
  user: React.PropTypes.object,
  reviews: React.PropTypes.array
};
