function PostsList() {
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
          <tr>
            <td>Mastering JavaScript Closures</td>
            <td>
              <strong style={{ color: "green" }}>Published</strong>
            </td>
            <td>
              <button className="btn">Unpublish</button>
            </td>
          </tr>
          <tr>
            <td>Why CSS Grid is Underrated</td>
            <td>
              <strong style={{ color: "#999" }}>Draft</strong>
            </td>
            <td>
              <button className="btn">Publish</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export { PostsList };
