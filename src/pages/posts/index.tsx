import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // Dynamic import to prevent server-side rendering of ReactQuill
import axios from "axios";
import { useRouter } from "next/router";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill so that it only renders on the client
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Posts: React.FC = () => {
  interface Post {
    userId: string;
    title: string;
    body: string;
  }

  const [posts, setPosts] = useState<Post>({
    userId: "",
    title: "",
    body: "",
  });

  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId") || "";
    setPosts((pverPost) => ({
      ...pverPost,
      userId,
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosts({
      ...posts,
      [e.target.name]: e.target.value,
    });
  };

  const handleReactQuillChange = (content: string) => {
    setPosts({
      ...posts,
      body: content,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/content/create",
        posts,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error(
        "Tạo bài viết không thành công:",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response?.data?.desc ||
          "Tạo bài viết không thành công. Vui lòng kiểm tra lại."
      ); // Cập nhật lỗi}
    }
  };
  return (
    <div className="max-w-3xl p-4 mx-auto mb-6 ">
      <h1 className="mb-4 text-2xl font-bold">Create New Content</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={posts.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="body" className="block mb-1">
            Body:
          </label>
          <ReactQuill
            value={posts.body}
            onChange={handleReactQuillChange}
            className="w-full border-gray-300 roundedrelative"
            style={{ height: "50vh" }}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="p-2 mt-10 text-white bg-blue-500 rounded mt hover:bg-blue-600"
          >
            Save content
          </button>
        </div>
      </form>
    </div>
  );
};

export default Posts;
