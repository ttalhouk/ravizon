module ApplicationHelper

  def flash_messages
    flash.map do |type, text|
      { id: text.object_id, type: type, text: text }
    end
  end
  def get_order_count
    return current_user.orders.where("fulfilled =?",false).count
  end
  def get_reviews(product)
    reviews =  product.reviews.map do |review|
      {
        title: review.title,
        body: review.body,
        rating: review.rating,
        updated_at: review.updated_at,
        reviewer: review.user.first_name
      }
    end

    return reviews
  end
end
