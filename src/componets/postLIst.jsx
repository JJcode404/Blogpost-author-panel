import { Link } from "react-router-dom";
import { useFetch } from "../utilis/userFetch";
const PostList = () => {
  const { data, error, loading } = useFetch();

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading posts...</p>;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error.message}</p>;
  }

  return (
    <>
      {data && data.length > 0 ? (
        data
          .filter((post) => post.title && post.content)
          .map((post) => (
            <article className="blog" key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h1 className="blog-title">{post.title}</h1>
              </Link>

              <div className="dotteddiv">
                <div className="dotted-line"></div>
                <div className="dotted-line"></div>
              </div>

              <div className="meta">
                {new Date(post.createdAt).toLocaleDateString()} ::{" "}
                <span className="author">
                  {post.author?.name || "Unknown Author"}
                </span>
              </div>
              <div className="tags">
                <span>#tech</span>
                <span>#self-hosting</span>
              </div>

              {/* Blog Image */}
              <div className="blog-image-wrapper">
                <img
                  src="./screen2.png"
                  alt="Blog Preview"
                  className="blog-image"
                />
              </div>
              <div className="content">
                <p>{post.content.slice(0, 300)}...</p>
              </div>
              <div className="readmore">
                <Link to={`posts/${post.id}`}>Read more →</Link>
              </div>
              <hr />
            </article>
          ))
      ) : (
        <p style={{ textAlign: "center" }}>No posts available.</p>
      )}
    </>
  );
};

export { PostList };
