class Order < ApplicationRecord
  belongs_to :product
  belongs_to :user
  belongs_to :shipment, optional: true

  validates :user_id, :product_id, presence: true
  validates :product_id, uniqueness: { scope: [:user_id, :fulfilled],
    message: "This item is already in your cart.  Go to cart to edit" }
  validates :qty, numericality: {only_integer: true, greater_than: 0}

  validate :order_qty_is_available

  def order_qty_is_available
    if (self.qty > self.product.stock)
      self.errors.add(:quantity, "Order exceeds available stock for " + self.product.name + ", Available quantity is " + self.product.stock.to_s + ".")
    end
  end

  def self.get_active_users_cart(user)
    return user.orders.where("fulfilled = ?", false)
  end
end
