class AddPurchaseToOrder < ActiveRecord::Migration[5.0]
  def change
    add_column :orders, :purchase, :string
  end
end
