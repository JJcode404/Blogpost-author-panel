// CommentSection.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../utilis/authContextapi";
import { usePostReq } from "../utilis/usePostReq";
import { useFetch } from "../utilis/userFetch";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function CommentBox({ blogId, onNewComment }) {
  const { loading, postData } = usePostReq();
  const { user, logout } = useAuth();
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      logout();
      navigate("/account");
      return;
    }
    if (user) {
      try {
        if (content) {
          const newComment = await postData(
            `http://localhost:3000/posts/${blogId}/comments`,
            {
              content,
              userId: user.id,
            }
          );
          console.log(
            "here is the new comment data from new comment",
            newComment
          );
          setContent("");

          // Add new comment to list
          if (newComment) {
            onNewComment(newComment);
          }
        }
      } catch (err) {
        console.log("hey here is the error for", err);
        logout();
        // navigate("/account");
      }
    } else {
      navigate("/account");
    }
  };

  return (
    <div className="commentBox">
      <form onSubmit={handlePostComment}>
        <textarea
          placeholder="Add to the discussion"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <div className="submitdiv">
          <button type="submit" disabled={!user}>
            Submit
          </button>
          {!user && <p>Please log in to comment.</p>}
        </div>
        {loading && <p>Commenting...</p>}
      </form>
    </div>
  );
}

function CommentSection({ blogId }) {
  const { user } = useAuth();
  const { data, error, loading } = useFetch(
    `http://localhost:3000/posts/${blogId}/comments`
  );

  const [comments, setComments] = useState([]);

  // When fetch completes, set the comments
  useEffect(() => {
    if (data) setComments(data);
  }, [data]);

  const handleNewComment = (newComment) => {
    console.log("hey am called", comments);
    setComments((prev) => [newComment, ...prev]);
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading posts...</p>;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error.message}</p>;
  }

  return (
    <section className="comments">
      <h2>Top comments ({comments.length})</h2>
      <CommentBox blogId={blogId} onNewComment={handleNewComment} />
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <div className="commentAuthor">
              {comment.user?.name || "Anonymous"} •{" "}
              {format(new Date(comment.createdAt), "MMMM d")}
            </div>
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No comments posted.</p>
      )}
    </section>
  );
}

export { CommentSection };
