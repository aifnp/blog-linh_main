import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";
import useSWR from "swr";

type PostDetailType = { content: string[]; title: string; description: string };
const PostDetail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  console.log("searchParams - ", location.search);
  const href = searchParams.get("href");
  console.log("href - ", href);
  const matches = location.search.match(/\[(.*?)\]/);
  const image = matches[1];
  const { data, error, isLoading } = useSWR(
    href,
    async (): Promise<PostDetailType> => {
      const response = await axios.post("http://localhost:8080/news/detail", {
        href,
      });
      return response.data.data;
    }
  );
  console.log(data, error, isLoading);
  if (error)
    return (
      <div className="text-center text-red-500 font-semibold">
        Xảy ra lỗi trong quá trình xử lý
      </div>
    );
  if (isLoading)
    return <div className="text-center font-semibold">...Loading</div>;
  if (data) {
    const { content, description, title } = data;
    return (
      <div className="">
        <h1 className="font-bold text-4xl mb-5">{title}</h1>
        <p className="text-justify text-gray-600 mb-5 text-lg">{description}</p>
        <img src={image} alt={title} className="w-full h-auto object-cover mb-5" />
        <article>
          {content.map((item, index) => (
            <p key={index} className="mb-3 text-lg">
              {item}
            </p>
          ))}
        </article>
      </div>
    );
  }
};

export default PostDetail;
