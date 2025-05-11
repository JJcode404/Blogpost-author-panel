import { usePost } from "../utilis/postContext";

function PostsList() {
  const { posts, loading, error } = usePost();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts: {error.message}</p>;
  if (posts) {
    console.log(posts);
  }
  // const posts = Array.isArray(data) ? data : data?.posts || [];
  // const authorName = data?.name || "Unknown Author";

  return (
    <section id="posts">
      <h2>All Posts</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr key="no-posts">
              <td colSpan="3">This user has no posts yet.</td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post.id || post._id || post.title}>
                <td>{post.title}</td>
                <td>
                  <strong style={{ color: post.published ? "green" : "#999" }}>
                    {post.published ? "Published" : "Draft"}
                  </strong>
                </td>
                <td>
                  <div className="action">
                    <button className="btn">
                      {post.published ? "Unpublish" : "Publish"}
                    </button>
                    <button className="btn">Delete</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}

export { PostsList };
