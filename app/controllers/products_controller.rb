class ProductsController < ApplicationController

  def index
    product_list = Product.all
    @products = []
    product_list.each do |product|
      if (product.stock > 0)
        item =  product.attributes
        item[:url] = product.image.url(:medium).gsub('http', 'https')
        @products.push(item)
      end
    end

    # render component: "ProductList", props: {products: @products}
  end

  def show
    @product = Product.find(params[:id])
  end
end
