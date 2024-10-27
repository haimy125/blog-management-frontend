// pages/content/posts.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import EditorComponent from "@/components/editor"; // Đảm bảo đường dẫn chính xác

interface Post {
  userId: string;
  title: string;
  body: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post>({ userId: "", title: "", body: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const userId = localStorage.getItem("userId") || "";
    setPosts((prev) => ({ ...prev, userId }));

    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isMounted) {
      setPosts({ ...posts, [e.target.name]: e.target.value });
    }
  };

  const handleEditorChange = (htmlContent: string) => {
    if (isMounted) {
      setPosts((prev) => ({
        ...prev,
        body: htmlContent,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:8080/content/create", posts, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      router.push("/");
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.desc
          ? error.response.data.desc
          : "Tạo bài viết không thành công. Vui lòng kiểm tra lại.";
      if (isMounted) {
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="max-w-3xl p-6 mx-auto mb-8 bg-white rounded-lg shadow-lg mt-14">
      <h1 className="mb-3 text-3xl font-bold text-center text-gray-800">
        Create New Content
      </h1>
      {error && (
        <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={posts.title}
            onChange={handleChange}
            required
            className="p-3 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="body"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Body:
          </label>
          <EditorComponent onChange={handleEditorChange} />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Save Content
          </button>
        </div>
      </form>
    </div>
  );
};

export default Posts;
