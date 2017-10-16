class ReviewsController < ApplicationController
  before_action :authenticate_user!
  before_action :get_product

  def index
    @reviews = @product.reviews
  end

  def create
    review = @product.reviews.build(review_params)
    review.user = current_user;

    respond_to do |format|
      if review.save
        p 'in success'
        flash[:success] = "Review Added"
        format.html {redirect_to product_path(@product)}
        format.json {
           render json: {review: review}, status: 201
        }
      else
        p 'in error'
        error_messages = review.errors.messages.values.join('. ')
        flash[:error] = 'Could not process review. ' + error_messages + '.'
        format.html {redirect_to product_path(@product)}
        format.json {
           render json: {messages: flash[:error]}, status: 400
        }
      end
    end
  end

  private

  def get_product
    @product = Product.find(params[:product_id])
  end

  def review_params
    params.require(:review).permit(:rating, :body, :title)
  end
end
