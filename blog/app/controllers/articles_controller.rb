class ArticlesController < ApplicationController
  def new
  end
  def create
    @articles = Article.new[params[:article])
    @article.save 
    redirect_to @article
  end
end
