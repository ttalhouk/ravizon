class Review < ApplicationRecord
  belongs_to :product
  belongs_to :user

  validates :body, :title, :product_id, :user_id, :rating, presence: true

  validates :user_id, uniqueness: { scope: [:product_id],
    message: "You have already reviewed this product." }
end
