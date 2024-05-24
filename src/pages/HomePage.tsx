import axios from "axios";
import React from "react";
import useSWR from "swr";
import PostCard from "../components/post/PostCard";
import { PostType } from "../components/post/type";

const fetcher = async (url: string): Promise<PostType[]> => {
  const response = await axios.get(url);
  return response.data.data;
};

const HomePage = () => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8080/news",
    fetcher
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

export default HomePage;
