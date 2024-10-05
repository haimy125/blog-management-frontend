import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // Dynamic import to prevent server-side rendering of ReactQuill
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useRouter } from "next/router";

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
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
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
        <div>
            <h1>Create New Content</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={posts.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <ReactQuill
                        value={posts.body}
                        onChange={handleReactQuillChange}
                    />
                </div>
                <button type="submit">Save content</button>
            </form>
        </div>
    );
};

export default Posts;
