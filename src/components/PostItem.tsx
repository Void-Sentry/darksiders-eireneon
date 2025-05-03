import { toggleLikeAtom, type Post } from "../atoms/postsAtom";
import { usePost } from "../hooks/usePost";
import "../styles/PostItem.css";
import { useAtom } from "jotai";

interface PostItemProps {
  post: Post;
  index: number;
}

function PostItem({ post, index }: PostItemProps) {
  const toggleLike = useAtom(toggleLikeAtom)[1];
  const { like, dislike } = usePost();

  const likeHandler = () => {
    toggleLike(index);

    post['liked'] ? like(post['id']) : dislike(post['id']);
  }

  return (
    <article className="post-item">
      <div className="post-image-container">
        <img src={post.image_blob} alt="Post" className="post-image" loading="lazy" />
      </div>
      <div className="post-content">
        <p className="post-text">{post.content}</p>
        <div className="post-actions">
          <button
            className={`like-button ${post.liked ? "liked" : ""}`}
            onClick={likeHandler}
            aria-label={post.liked ? "Descurtir" : "Curtir"}
            aria-pressed={post.liked}
          >
            <span className="like-icon">{post.liked ? "❤️" : "🤍"}</span>
            <span className="like-count">{post.likes}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default PostItem;
