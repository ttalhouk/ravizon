require 'rails_helper'

# RSpec.describe "Comments", type: :request do
#   before do
#     @user = User.create!({email:"example@example.com", password:"123456", password_confirmation:"123456"})
#     @user2 = User.create!({email:"other@example.com", password:"123456", password_confirmation:"123456"})
#     @article = @user.articles.create(title:'The First Article', body:'Lorem Ipsum Carpe Diem')
#   end
#
#   describe 'POST /articles/:id/comments/:id' do
#     # context 'As author' do
#     #   before {
#     #     login_as(@user)
#     #     get "/articles/#{@article.id}/edit"
#     #   }
#     #   it "allows user to access edit page" do
#     #     expect(response.status).to eq(200)
#     #   end
#     #
#     # end
#     context 'As non-author' do
#       before do
#         login_as(@user2)
#         post "/articles/#{@article.id}/comments", params: {comment:{body: "Comment Body"}}
#       end
#       it "creates comment successfully" do
#         expect(response).to redirect_to(article_path(@article))
#         expect(response.status).to eq(302)
#         flash_message = "Comment has been created"
#         expect(flash[:success]).to eq(flash_message)
#       end
#     end
#     context 'As non-logged in user' do
#       before {
#         post "/articles/#{@article.id}/comments", params: {comment:{body: "Comment Body"}}
#       }
#       it "redirect to sign-in page" do
#         expect(response).to redirect_to(new_user_session_path)
#         expect(response.status).to eq(302)
#         flash_message = "You need to sign in or sign up before continuing."
#         expect(flash[:danger]).to eq(flash_message)
#       end
#     end
#   end
# end
