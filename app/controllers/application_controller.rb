class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def after_sign_in_path_for(resource)
    request.env['omniauth.origin'] || root_path
  end
  protected
  # def authenticate_user!
  #   if user_signed_in?
  #     super
  #   else
  #     respond_to do |format|
  #       flash[:notice] = 'Please login or sign up to access.'
  #       # flash.keep(:notice)
  #       format.html {redirect_to new_user_session_path}
  #       format.json {
  #         render json: {messages: flash[:notice], redirect: "#{new_user_session_path}"}, status: 400
  #       }
  #     end
  #      ## if you want render 404 page
  #      ## render :file => File.join(Rails.root, 'public/404'), :formats => [:html], :status => 404, :layout => false
  #   end
  # end
end
