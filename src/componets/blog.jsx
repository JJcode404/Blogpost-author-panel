import { useFetch } from "../utilis/userFetch";

function Blog({ blogId }) {
  const { data, error, loading } = useFetch(
    `http://localhost:3000/posts/${blogId}`
  );

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading posts...</p>;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error.message}</p>;
  }

  return (
    <>
      {data && (
        <article className="blog" key={data.id}>
          <h1 className="blog-title">{data.title}</h1>

          <div className="dotteddiv">
            <div className="dotted-line"></div>
            <div className="dotted-line"></div>
          </div>

          <div className="meta">
            {new Date(data.createdAt).toLocaleDateString()} ::{" "}
            <span className="author">
              {data.author?.name || "Unknown Author"}
            </span>
          </div>

          <div className="tags">
            <span>#tech</span>
            <span>#self-hosting</span>
          </div>

          <div className="content">{data.content}</div>
        </article>
      )}
    </>
  );
}

export { Blog };
