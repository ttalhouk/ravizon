class AuthenticationsController < ApplicationController
  def destroy
    current_user.update_attributes(provider: nil, uid: nil)
    redirect_to edit_user_registration_path, success: "Facebook Account Unlinked"
  end
end
