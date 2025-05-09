import { Link } from "react-router-dom";
import { useFetch } from "../utilis/userFetch";
import { format } from "date-fns";

function ReadNext() {
  let { data, error, loading } = useFetch(`http://localhost:3000/posts/latest`);
  let latestPosts = data;

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading posts...</p>;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error.message}</p>;
  }
  return (
    <>
      <div className="readNext">
        <h1>Read next</h1>
        <div className="bloglist11">
          {latestPosts && latestPosts.length > 0 ? (
            latestPosts.map((latestPost) => (
              <Link to={`/posts/${latestPost.id}`} key={latestPost.id}>
                <div className="blog11">
                  <img src="/vite.svg" alt="" />
                  <div className="blogdetails">
                    <div className="blog-title11">{latestPost.title}</div>
                    <div className="blog-autherDate">
                      {latestPost.author.name} -{" "}
                      {format(new Date(latestPost.createdAt), "MMMM d")}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    </>
  );
}
export { ReadNext };
