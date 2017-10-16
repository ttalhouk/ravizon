Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root to: 'home#index'

  devise_for :users, :controllers => {
    :omniauth_callbacks => "users/omniauth_callbacks",
    :registrations => "registrations", only:[:update]
  }
  resources :charges
  resources :authentications, only: [:destroy]
  resources :users, only: [:show] do
    resources :orders, except: [:show, :create, :new] do
      collection do
        get 'cart'
        post 'purchase'
      end
    end
  end
  resources :orders, only: [:create]
  resources :products, only: [:index, :show] do
    resources :reviews, only: [:index, :create]
  end

end
