class ArticlesController < ApplicationController

  def index
    @articles=Article.all
  end
  def new
    @post = Post.new
    @posts=Post.index
    @post = Post.new(params[:post].permit(:title, :text))
    @post.save
    redirect_to @post
  end

  def create
    @article = Article.new(article_params)
    if @article.save
      redirect_to @article
    else
      render 'new'
    end
  end

  def show
    @article = Article.find(params[:id])
  end

  private def article_params
    params.require(:article).permit(:title, :text)
  end
end
