class AddAddressToShipments < ActiveRecord::Migration[5.0]
  def change
    add_column :shipments, :address, :text
  end
end
