// pages/content/detail.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import EditorComponent from "@/components/editor"; // Đảm bảo đường dẫn chính xác

interface Comment {
  userId: string;
  fullName: string;
  avatar: string | null;
  body: string;
}

interface ContentDetail {
  contentId: string;
  userId: string;
  fullName: string;
  avatar: string | null;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  commentResponseDTOList: Comment[];
}

const Detail: React.FC = () => {
  const [content, setContent] = useState<ContentDetail | null>(null);
  const [showCommentForm, setShowCommentForm] = useState(false); // Kiểm soát hiển thị form
  const [commentText, setCommentText] = useState(""); // Trạng thái cho nội dung bình luận

  useEffect(() => {
    const contentData = localStorage.getItem("contentDetail");
    if (contentData) {
      setContent(JSON.parse(contentData));
    }
  }, []);

  const handleCommentButtonClick = () => {
    setShowCommentForm(!showCommentForm); // Bật/tắt form bình luận
  };

  const handleEditorChange = (htmlContent: string) => {
    setCommentText(htmlContent); // Cập nhật nội dung bình luận
  };

  if (!content) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Không tìm thấy nội dung</h1>
      </div>
    );
  }

  const formattedDate = format(
    new Date(content.createdAt),
    "dd/MM/yyyy HH:mm:ss",
    { locale: vi }
  );

  const handleSubmitComment = () => {
    if (!commentText.trim()) {
      alert("Vui lòng nhập nội dung bình luận.");
      return;
    }
    // Thêm logic gửi bình luận tại đây, ví dụ: gọi API hoặc cập nhật danh sách bình luận.
    console.log("Nội dung bình luận:", commentText);
    setCommentText(""); // Xóa nội dung sau khi gửi
    setShowCommentForm(false); // Đóng form sau khi gửi
  };

  return (
    <div className="max-w-3xl p-4 mx-auto mt-14 mb-6 overflow-hidden bg-white border border-gray-300 rounded shadow-lg">
      <div className="flex items-center p-4">
        <Image
          src={content.avatar || "/default-avatar.svg"}
          alt={content.fullName}
          width={32}
          height={32}
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4">
          <p className="text-lg font-bold">{content.fullName}</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold">{content.title}</h3>
        <div
          className="mb-4 text-gray-700"
          dangerouslySetInnerHTML={{ __html: content.body }}
        />
      </div>

      <div className="flex items-center justify-between px-6 pb-6">
        <button
          onClick={handleCommentButtonClick}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Bình luận
        </button>
        {content.commentResponseDTOList?.length > 0 && (
          <span className="text-sm font-semibold text-gray-600">
            {content.commentResponseDTOList.length} bình luận
          </span>
        )}
      </div>

      {/* Form bình luận */}
      {showCommentForm && (
        <div className="px-6 pb-6">
          <EditorComponent onChange={handleEditorChange} />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmitComment}
              className="px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
              Gửi
            </button>
          </div>
        </div>
      )}

      {content.commentResponseDTOList?.length > 0 && (
        <div className="px-6 pb-6 comments">
          {content.commentResponseDTOList.map((comment) => (
            <div key={comment.userId} className="flex items-center mb-2">
              <Image
                src={comment.avatar || "/default-avatar.svg"}
                alt={comment.fullName}
                width={32}
                height={32}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-4">
                <p className="font-semibold">{comment.fullName}</p>
                <p className="text-sm text-gray-600">{comment.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Detail;
