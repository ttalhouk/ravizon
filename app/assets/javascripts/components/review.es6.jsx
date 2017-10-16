class Review extends React.Component {
  renderRating() {
    let stars = [];
    for (let i = 1; i <= this.props.review.rating; i++) {
      stars.push(
        <i key={i} className='ion-android-star'></i>
      )
    }
    return stars
  }
  render () {
    return (
      <div className="review-list--item">
        <h3 className="review-list--item__title">
          {this.props.review.title}
        </h3>
        <span className="review-list--item__stars">
          {this.renderRating()}
        </span>
        <blockquote className="review-list--item__review">
          {this.props.review.body}
        </blockquote>
        <p className="review-list--item__username">
          - {this.props.user.first_name ? this.props.user.first_name: 'Anonymous'}
        </p>
        <span className="review-list--item__timestamp">
          ({moment(this.props.review.updated_at).format("dddd, MMMM Do YYYY")})</span>
      </div>
    );
  }
}

Review.propTypes = {
  review: React.PropTypes.object,
  user: React.PropTypes.object
};
