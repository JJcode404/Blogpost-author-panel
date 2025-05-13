import { usePost } from "../utilis/postContext";

function PostsList() {
  const { posts, updatePublish, deletePost } = usePost();

  const handleTogglePublish = async (post) => {
    try {
      await updatePublish(post.id || post._id, post.published);
    } catch (err) {
      console.error("Error toggling publish:", err);
    }
  };

  const handleDelete = async (post) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(post.id || post._id);
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

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
                  <div className="action btntable">
                    <button
                      className="btn"
                      onClick={() => handleTogglePublish(post)}
                    >
                      {post.published ? "Unpublish" : "Publish"}
                    </button>
                    <button className="btn" onClick={() => handleDelete(post)}>
                      Delete
                    </button>
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
