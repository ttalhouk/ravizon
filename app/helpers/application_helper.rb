module ApplicationHelper

  def flash_messages
    flash.map do |type, text|
      { id: text.object_id, type: type, text: text }
    end
  end
  def get_order_count
    return current_user.orders.where("fulfilled =?",false).count
  end
end
