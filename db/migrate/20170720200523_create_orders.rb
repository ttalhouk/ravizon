class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.references :user, foreign_key: true
      t.references :product, foreign_key: true
      t.integer :qty
      t.boolean :fulfilled, default:false

      t.timestamps
    end
  end
end
