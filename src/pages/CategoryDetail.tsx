import React from "react";
import { useParams } from "react-router-dom";
import { PostType } from "../components/post/type";
import PostCard from "../components/post/PostCard";
import useSWR from "swr";
import axios from "axios";

const CategoryDetail = () => {
  const { slug } = useParams();
  console.log("slug - ", slug);
  const { data, error, isLoading } = useSWR(
    `${slug}`,
    async (): Promise<PostType[]> => {
      const response = await axios.post("http://localhost:8080/news/category", {
        category: slug,
      });
      return response.data.data;
    }
  );
  if (error)
    return (
      <div className="text-center text-red-500 font-semibold">
        Xảy ra lỗi trong quá trình xử lý
      </div>
    );
  if (isLoading)
    return <div className="text-center font-semibold">...Loading</div>;
  if (data)
    return (
      <div className="grid grid-cols-4 gap-x-5 gap-y-10">
        {data.map((item) => (
          <PostCard key={item.title} post={item} />
        ))}
      </div>
    );
};

export default CategoryDetail;
