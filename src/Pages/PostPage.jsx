import { useParams } from "react-router-dom";
import { Blog } from "../componets/blog";
import { ReadNext } from "../componets/readNext";
import { CommentSection } from "../componets/comments";
import React from "react";
import { useEffect } from "react";

const PostPage = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="blogPage" key={id}>
      <Blog blogId={id} />
      <CommentSection blogId={id} />
      <ReadNext blogId={id} />
    </div>
  );
};
export { PostPage };
