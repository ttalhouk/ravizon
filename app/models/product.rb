class Product < ApplicationRecord
  has_many :orders, dependent: :destroy
  has_many :reviews, dependent: :destroy

  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.svg"
  validates_attachment :image,
  content_type: { content_type: ["image/jpeg", "image/gif", "image/png", "image/svg"] }
  validates :stock, numericality: {only_integer: true, greater_than_or_equal: 0}
  validates :price, numericality: {greater_than: 0.0}
  validates :name, :description, presence: true
  validates :name, uniqueness: true


  def self.update_product_qty(orders)
    orders.each do |order|
      order.product.update(stock: (order.product.stock - order.qty))
    end
  end
end
