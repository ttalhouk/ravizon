class OrdersController < ApplicationController
  before_action :authenticate_user!
  before_action :get_order, only: [:update, :destroy]

  def index
    @orders = current_user.orders.order(:id)
    @products = current_user.products
  end

  def create
    @user = current_user
    @product = Product.find(params[:product])
    @order = @user.orders.build({product: @product})
    respond_to do |format|
      if @order.save
        flash.now[:success] = "Item added to cart."
        format.html {redirect_to products_path}
        format.json {
           render json: {order: @order}, status: 201
        }
      else
        p @order.errors
        error_messages = @order.errors.messages.values.join('. ')
        flash.now[:error] = 'Could not process request. ' + error_messages + '.'
        format.html {redirect_to products_path}
        format.json {
           render json: {messages: flash[:error]}, status: 400
        }
      end
    end
  end

  def update
    @order = current_user.orders.find(params[:id])
    current_qty = @order.qty
    @order.attributes = {qty: order_params[:qty]}
    respond_to do |format|
      if @order.save
        flash.now[:success] = "Item updated."
        format.html {redirect_to user_orders_path(current_user)}
        format.json {
           render json: {order: @order}, status: 200
        }
      else
        error_messages = @order.errors.messages.values.join('. ')
        flash.now[:error] = 'Could not process request. ' + error_messages + '.'
        format.html {redirect_to user_orders_path(current_user)}
        format.json {
           render json: {messages: flash[:error], qty: current_qty}, status: 400
        }
      end
    end
  end

  def cart
    @orders = Order.get_active_users_cart(current_user)
    p @orders
    @errors = []
    @invalid_orders = []
    @orders.each do |order|
      order.order_qty_is_available
      if order.errors.any?
        p 'error with'
        p order
        @errors.push(order.errors.messages.values.join('. '))
        @invalid_orders.push(order)
      end
    end

    respond_to do |format|
      if @errors.empty?
        # @orders.update_all(fulfilled: true)
        # flash.now[:success] = "Order can be processed. Click Purchase to Proceed."
        format.html
      else
        error_messages = @errors.join('. ')
        p error_messages
        flash.now[:error] = 'Could not process request. ' + error_messages + '.  Update quantities to continue.'
        format.html {redirect_to user_orders_path(current_user)}
      end
    end
  end

  def purchase
    # make api call to 3rd party vendor.  If successfull update status of fulfilled else return errors

    @orders = Order.get_active_users_cart(current_user)
    @errors = []
    @invalid_orders = []
    @amount = 0

    #check for quantity errors and update charge amount
    @orders.each do |order|
      order.order_qty_is_available
      if order.errors.any?
        @errors.push(order.errors.messages.values.join('. '))
        @invalid_orders.push(order)
      end
      @amount = @amount + (order.qty * order.product.price)
    end

    # if errors return to cart

    if (@errors.any?)
      respond_to do |format|
        error_messages = @errors.join('. ')
        flash.now[:error] = 'Could not process request. ' + error_messages + '.  Update quantities to continue.'
        format.html {redirect_to user_orders_path(current_user)}
        format.json {
           render json: {
             messages: flash[:error],
             orders: @orders, invalidOrders: @invalid_orders
             }, status: 400
        }
      end
    else
      #make Stripe API Call
      @amount = @amount * 100
      if (!current_user.stripe_id)
        customer = Stripe::Customer.create(
          :email => params[:stripeEmail],
          :source  => params[:stripeToken]
        )
        current_user.update(stripe_id: customer.id)
      end

      charge = Stripe::Charge.create(
        :customer    => current_user.stripe_id,
        :amount      => @amount.to_i,
        :description => "Nail Shop Order for #{current_user.email}",
        :currency    => 'usd',
        :receipt_email => params[:stripeEmail]
      )
      # if charge successful update order fulfilled
      # update product quantities
      # create purchase for order with stripe ID
      respond_to do |format|
        p charge.paid
        if charge.paid
          p "in paid"
          @orders.update_all({fulfilled: true, purchase: charge.id})
          Product.update_product_qty(@orders)
          @shipment = Shipment.create(address: getAddress)
          @orders.each do |order|
            @shipment.orders << order
          end
          flash.now[:success] = "Order has been processed."

          format.html {redirect_to user_orders_path(current_user)}
          format.json {
             render json: {orders: @orders}, status: 200
          }
        end
      end

    end
    # if card error redirect back to cart and display error

    rescue Stripe::CardError => e
      flash.now[:error] = e.message
      redirect_to cart_user_orders(current_user)

  end

  def destroy

    respond_to do |format|
      if @order.destroy
        flash.now[:success] = "Item deleted."
        format.html {redirect_to user_orders_path(current_user)}
        format.json {
           render json: {order: @order}, status: 200
        }
      else
        error_messages = @order.errors.messages.values.join('. ')
        flash.now[:error] = 'Could not process request. ' + error_messages + '.'
        format.html {redirect_to user_orders_path(current_user)}
        format.json {
           render json: {messages: flash[:error], order: @order}, status: 400
        }
      end
    end
  end

  private
  def get_order
    @order = current_user.orders.find(params[:id])
  end
  def order_params
    params.require(:order).permit(:qty, :fulfilled)
  end
  def getAddress
    return "#{params[:stripeBillingName]} \n #{params[:stripeShippingAddressLine1]} \n #{params[:stripeShippingAddressCity]}, #{params[:stripeShippingAddressState]} #{params[:stripeShippingAddressZip]}"
  end


end
