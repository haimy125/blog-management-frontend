import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

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
  const [data, setData] = useState<{
    contents: Content[];
    loading: boolean;
    error: string | null;
  }>({
    contents: [],
    loading: true,
    error: null,
  });
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const router = useRouter();
  const [hasMoreData, setHasMoreData] = useState(false);

  const fetchContentDetail = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/content`, {
        params: { id: id },
      });
      if (response.data.success) {
        console.log("Dữ liệu trả về:", response.data.data);
        localStorage.setItem(
          "contentDetail",
          JSON.stringify(response.data.data)
        );
        router.push(`/content/detail`);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu chi tiết:", error);
    }
  };

  const handleToggleContent = (id: string) => {
    fetchContentDetail(id);
  };

  useEffect(() => {
    const fetchContents = async () => {
      setData((prev) => ({ ...prev, loading: true }));
      try {
        const response = await axios.get(
          `http://localhost:8080/content/getAll?page=${page}&size=${size}`
        );
        setData({
          contents: response.data.data,
          loading: false,
          error: null,
        });
        setHasMoreData(response.data.data.length > 0);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setData((prev) => ({
          ...prev,
          loading: false,
          error: "Lỗi khi tải dữ liệu",
        }));
      }
    };
    fetchContents();
  }, [page, size]);

  return (
    <div className="newsfeed">
      {data.loading ? (
        <p>Đang tải...</p>
      ) : data.error ? (
        <p className="text-red-500">{data.error}</p>
      ) : (
        data.contents.map((content) => {
          const formattedDate = format(
            new Date(content.createdAt),
            "dd/MM/yyyy HH:mm:ss",
            { locale: vi }
          );

          return (
            <div
              key={content.contentId}
              className="max-w-3xl p-4 mx-auto mt-4 mb-6 overflow-hidden bg-white border border-gray-300 rounded shadow-lg"
            >
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
                  className="mb-4 overflow-hidden text-gray-700 transition-all duration-300 max-h-16"
                  dangerouslySetInnerHTML={{ __html: content.body }}
                />
                <button
                  onClick={() => handleToggleContent(content.contentId)}
                  className="text-blue-500 hover:underline"
                >
                  Xem thêm
                </button>
              </div>

              <div className="flex items-center justify-between p-4">
                {/* Hiển thị số lượng bình luận */}
                {content.commentResponseDTOList.length > 0 && (
                  <div className="absolute bottom-4 right-4 text-gray-600">
                    <span className="text-sm font-semibold">
                      {content.commentResponseDTOList.length} bình luận
                    </span>
                  </div>
                )}
              </div>

              {content.commentResponseDTOList?.length > 0 && (
                <div className="comments">
                  {content.commentResponseDTOList.map((comment) => (
                    <div
                      key={comment.userId}
                      className="flex items-center mb-2"
                    >
                      <Image
                        src={comment.avatar || "/default-avatar.svg"}
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
          );
        })
      )}

      <div className="flex items-center justify-center px-6 pb-6 mt-4 space-x-4">
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
