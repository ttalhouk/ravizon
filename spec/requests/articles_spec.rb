require 'rails_helper'

# RSpec.describe "Articles", type: :request do
#   before do
#     @user = User.create!({email:"example@example.com", password:"123456", password_confirmation:"123456"})
#     @user2 = User.create!({email:"other@example.com", password:"123456", password_confirmation:"123456"})
#     @article = @user.articles.create(title:'The First Article', body:'Lorem Ipsum Carpe Diem')
#   end
#
#   describe 'GET /articles/:id/edit' do
#     context 'As author' do
#       before {
#         login_as(@user)
#         get "/articles/#{@article.id}/edit"
#       }
#       it "allows user to access edit page" do
#         expect(response.status).to eq(200)
#       end
#
#     end
#     context 'As non-author' do
#       before do
#         login_as(@user2)
#         get "/articles/#{@article.id}/edit"
#       end
#       it "redirect to home page" do
#         expect(response.status).to eq(302)
#         flash_message = "You are not authorized to edit this article."
#         expect(flash[:danger]).to eq(flash_message)
#       end
#
#     end
#     context 'As non-logged in user' do
#       before {
#         get "/articles/#{@article.id}/edit"
#       }
#       it "redirect to sign-in page" do
#         expect(response.status).to eq(302)
#         flash_message = "You need to sign in or sign up before continuing."
#         expect(flash[:alert]).to eq(flash_message)
#       end
#     end
#   end
#
#
#
#   describe 'GET /articles/:id' do
#     context 'with existing article' do
#       before { get "/articles/#{@article.id}"}
#       it 'handles existing article' do
#         expect(response.status).to eq(200)
#       end
#     end
#     context 'with non-existing article' do
#       before { get "/articles/xxxx"}
#       it 'handles non-existing article' do
#         expect(response.status).to eq(302)
#         flash_message = "The article you are looking for could not be found"
#         expect(flash[:danger]).to eq(flash_message)
#       end
#     end
#   end
#
#   describe 'Delete /articles/:id' do
#     context 'As author' do
#       before {
#         login_as(@user)
#         delete "/articles/#{@article.id}"
#       }
#       it "allows user to delete their own article" do
#         expect(response.status).to eq(302)
#       end
#
#     end
#     context 'As non-author' do
#       before do
#         login_as(@user2)
#         delete "/articles/#{@article.id}"
#       end
#       it "does not delete article and redirect to home page" do
#         expect(response.status).to eq(302)
#         flash_message = "You are not authorized to delete this article."
#         expect(flash[:danger]).to eq(flash_message)
#       end
#
#     end
#     context 'As non-logged in user' do
#       before {
#         delete "/articles/#{@article.id}"
#       }
#       it "does not delete article and redirect to sign-in page" do
#         expect(response.status).to eq(302)
#         flash_message = "You need to sign in or sign up before continuing."
#         expect(flash[:alert]).to eq(flash_message)
#       end
#     end
#   end
# end
