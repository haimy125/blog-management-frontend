// API Route gọi tới backend Spring Boot
import type { NextApiRequest, NextApiResponse } from "next";

// Tạo kiểu cho dữ liệu trả về từ server (TypeScript)
type ContentResponse = {
  data: {
    contentId: string;
    userId: string;
    fullName: string;
    avatar: string | null;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    commentResponseDTOList: {
      userId: string;
      fullName: string;
      avatar: string | null;
      body: string;
    }[];
  }[];
};

// Hàm xử lý request
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page = 0, size = 10 } = req.query; // Lấy page và size từ query string (phân trang)

  try {
    // Gọi API từ server Spring Boot (giả sử server của bạn chạy ở localhost:8080)
    const response = await fetch(
      `http://localhost:8080/content/getAll?page=${page}&size=${size}`
    );

    // Kiểm tra xem phản hồi có thành công không
    if (!response.ok) {
      throw new Error("Failed to fetch data from Spring Boot API");
    }
    const data: ContentResponse = await response.json(); // Đọc dữ liệu trả về

    // Trả lại dữ liệu cho client Next.js
    res.status(200).json(data);
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
