class User < ApplicationRecord
  has_many :products, through: :orders
  has_many :reviews, dependent: :destroy
  has_many :orders, dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  devise :omniauthable, :omniauth_providers => [:facebook]

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20],
      user.provider = auth.provider,
  		user.uid = auth.uid
    end
  end
  def apply_omniauth(auth)
  	update_attributes(
  		provider: auth.provider,
  		uid: auth.uid
  	)
  end
  def has_facebook_linked?
  	self.provider.present? && self.uid.present?
  end
end
