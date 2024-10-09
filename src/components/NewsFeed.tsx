import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

interface Content {
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

interface Comment {
  userId: string;
  fullName: string;
  avatar: string | null;
  body: string;
}

const NewsFeed: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5); // Kích thước mỗi trang
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [hasMoreData, setHasMoreData] = useState(false);

  const handleToggleContent = () => {
    // router.push(`/posts/${contentId}`);
    router.push("/");
  };

  useEffect(() => {
    const fetchContents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/content/getAll?page=${page}&size=${size}`
        );
        setContents(response.data.data);
        setHasMoreData(response.data.data.length > 0);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContents();
  }, [page, size]);

  return (
    <div className="newsfeed">
      {isLoading ? (
        <p>Đang tải...</p>
      ) : (
        contents.map((content) => (
          <div
            key={content.contentId}
            className="max-w-3xl mt-4 p-4 mx-auto mb-6 overflow-hidden bg-white border border-gray-300 rounded shadow-lg"
          >
            <div className="flex items-center p-4">
              <Image
                src={content.avatar || "/default-avatar.svg"} // Hình ảnh mặc định nếu avatar là null
                alt={content.fullName}
                width={32}
                height={32}
                className="w-16 h-16 rounded-full"
              />
              <div className="ml-4">
                <p className="text-lg font-bold">{content.fullName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(content.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Nội dung chính */}
            <div className="p-6">
              <h3 className="mb-2 text-xl font-semibold">{content.title}</h3>
              <div
                className="mb-4 overflow-hidden text-gray-700 transition-all duration-300 max-h-16"
                dangerouslySetInnerHTML={{ __html: content.body }}
              />
              <button
                onClick={() => handleToggleContent()}
                className="text-blue-500 hover:underline"
              >
                Xem thêm
              </button>
            </div>

            {/* Hiển thị bình luận */}
            {content.commentResponseDTOList.length > 0 && (
              <div className="comments">
                {content.commentResponseDTOList.map((comment) => (
                  <div key={comment.userId} className="flex items-center mb-2">
                    <Image
                      src={comment.avatar || "/default-avatar.svg"} // Hình ảnh mặc định nếu avatar là null
                      alt={comment.fullName}
                      width={32}
                      height={32}
                      className="w-16 h-16 rounded-full"
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
        ))
      )}

      <div className="flex items-center justify-center mt-4 px-6 pb-6 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600 disabled:bg-gray-300"
        >
          Trang trước
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasMoreData}
          className="px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600 disabled:bg-gray-300"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default NewsFeed;
