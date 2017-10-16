class AddShipmentToOrders < ActiveRecord::Migration[5.0]
  def change
    add_reference :orders, :shipment, foreign_key: true
  end
end
