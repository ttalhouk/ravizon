class ChangeColumnQtyInOrders < ActiveRecord::Migration[5.0]
  def change
    change_column :orders, :qty, :integer, default: 1
  end
end
