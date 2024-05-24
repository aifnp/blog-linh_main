import React, { FC } from "react";
import { PostType } from "./type";
import { Link } from "react-router-dom";

type PostCardProps = { post: PostType };
const PostCard: FC<PostCardProps> = ({ post }) => {
  const { description, href, thumbnail, title } = post;
  return (
    <Link className="block" to={`/post?href=${href}&img=[${thumbnail}]`}>
      <img
        src={thumbnail}
        alt={title}
        className="w-full aspect-[16/10] object-cover rounded-md"
      />
      <div className="pt-3">
        <h4 className="font-semibold text-lg line-clamp-2 mb-1">{title}</h4>
        <p className="line-clamp-3 text-gray-500">{description}</p>
      </div>
    </Link>
  );
};

export default PostCard;
