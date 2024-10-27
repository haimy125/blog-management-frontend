import React from "react";
import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Comment {
  userId: string;
  fullName: string;
  avatar: string | null;
  body: string;
}

interface Content {
  contentId: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  avatar: string | null;
  commentResponseDTOList: Comment[];
}

interface PostDetailProps {
  content: Content | null;
}

const formatDateTime = (date: string) =>
  new Date(date).toLocaleString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const PostDetail: React.FC<PostDetailProps> = ({ content }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Đang tải...</div>;
  }

  if (!content) {
    return <div>Không tìm thấy nội dung.</div>;
  }

  return (
    <div className="max-w-3xl p-4 mx-auto bg-white border border-gray-300 rounded shadow-lg">
      <div className="flex items-center p-4">
        <Image
          src={content.avatar || "/default-avatar.svg"}
          alt={content.fullName}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4">
          <p className="text-lg font-bold">{content.fullName}</p>
          <p className="text-sm text-gray-500">{formatDateTime(content.createdAt)}</p>
        </div>
      </div>

      <h1 className="mt-6 text-3xl font-bold">{content.title}</h1>
      <div className="mt-4 mb-8" dangerouslySetInnerHTML={{ __html: content.body }} />

      {content.commentResponseDTOList.length > 0 && (
        <div className="comments">
          <h3 className="text-2xl font-semibold">Bình luận</h3>
          {content.commentResponseDTOList.map((comment) => (
            <div key={comment.userId} className="flex items-center mt-4">
              <Image
                src={comment.avatar || "/default-avatar.svg"}
                alt={comment.fullName}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
              <div className="ml-4">
                <p className="font-semibold">{comment.fullName}</p>
                <p className="text-gray-600">{comment.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await axios.get('http://localhost:8080/content/getAll?page=0&size=100');
    const contents: Content[] = response.data.data;

    const paths = contents.map((content) => ({
      params: { id: content.contentId },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bài viết:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const response = await axios.get(`http://localhost:8080/content/${params?.id}`);
    const content: Content = response.data.data;

    return {
      props: {
        content,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết bài viết:', error);
    return {
      props: {
        content: null,
      },
    };
  }
};

export default PostDetail;
