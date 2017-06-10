class CommentsController < ApplicationController

  http_basic_authenticate_with name: "dhh", password: "secret", only: :destory
  def index
    @articles = Articles.all
  end

  def create
    @article = Article.find(params[:article_id])
    @comment = @article.comments.create(comment_params)
    redirect_to article_path(@article)
  end

  def destroy
    @article = Article.find(params[:article_id])
    @comment = @article.commetns.find(params[:id])
    @comment.destroy
  end

  private def comment_params
    params.require(:comment).permist(:commenter, :body)
  end
end
