function CommentsList() {
  return (
    <section id="comments">
      <h2>Manage Comments</h2>
      <div className="comment">
        <p>
          <strong>Jane Doe:</strong> Great post on closures!
        </p>
        <div className="action">
          <button className="btn">Edit</button>
          <button className="btn">Delete</button>
        </div>
      </div>
      <div className="comment">
        <p>
          <strong>Alex:</strong> I think you should add more examples.
        </p>
        <div className="action">
          <button className="btn">Edit</button>
          <button className="btn">Delete</button>
        </div>
      </div>
    </section>
  );
}

export { CommentsList };
