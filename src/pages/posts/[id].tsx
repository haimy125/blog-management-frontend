import React from "react";

const PostDetailPage = () => {
  return <div>PostDetailPage</div>;
};

export default PostDetailPage;
// import { GetStaticPaths, GetStaticProps } from 'next';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import Image from 'next/image';

// interface Comment {
//   userId: string;
//   fullName: string;
//   avatar: string | null;
//   body: string;
// }

// interface Content {
//   contentId: string;
//   title: string;
//   body: string;
//   createdAt: string;
//   updatedAt: string;
//   fullName: string;
//   avatar: string | null;
//   commentResponseDTOList: Comment[];
// }

// interface PostDetailProps {
//   content: Content | null;
// }

// const PostDetail: React.FC<PostDetailProps> = ({ content }) => {
//   const router = useRouter();

//   // Kiểm tra nếu trang đang ở trạng thái fallback
//   if (router.isFallback) {
//     return <div>Đang tải...</div>;
//   }

//   if (!content) {
//     return <div>Không tìm thấy nội dung.</div>;
//   }

//   return (
//     <div className="max-w-3xl p-4 mx-auto bg-white border border-gray-300 rounded shadow-lg">
//       <div className="flex items-center p-4">
//         <Image
//           src={content.avatar || "/default-avatar.svg"} // Hình ảnh mặc định nếu avatar là null
//           alt={content.fullName}
//           width={64}
//           height={64}
//           className="w-16 h-16 rounded-full"
//         />
//         <div className="ml-4">
//           <p className="text-lg font-bold">{content.fullName}</p>
//           <p className="text-sm text-gray-500">
//             {new Date(content.createdAt).toLocaleString()}
//           </p>
//         </div>
//       </div>

//       <h1 className="mt-6 text-3xl font-bold">{content.title}</h1>
//       <div className="mt-4 mb-8" dangerouslySetInnerHTML={{ __html: content.body }} />

//       {/* Hiển thị bình luận */}
//       {content.commentResponseDTOList.length > 0 && (
//         <div className="comments">
//           <h3 className="text-2xl font-semibold">Bình luận</h3>
//           {content.commentResponseDTOList.map((comment) => (
//             <div key={comment.userId} className="flex items-center mt-4">
//               <Image
//                 src={comment.avatar || "/default-avatar.svg"} // Hình ảnh mặc định nếu avatar là null
//                 alt={comment.fullName}
//                 width={32}
//                 height={32}
//                 className="w-8 h-8 rounded-full"
//               />
//               <div className="ml-4">
//                 <p className="font-semibold">{comment.fullName}</p>
//                 <p className="text-gray-600">{comment.body}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // Xác định tất cả các đường dẫn động cần được tạo tĩnh
// export const getStaticPaths: GetStaticPaths = async () => {
//   try {
//     const response = await axios.get('http://localhost:8080/content/getAll?page=0&size=100');
//     const contents: Content[] = response.data;

//     const paths = contents.map((content) => ({
//       params: { id: content.contentId },
//     }));

//     return {
//       paths,
//       fallback: true, // fallback true để xử lý những đường dẫn chưa được tạo sẵn
//     };
//   } catch (error) {
//     console.error('Lỗi khi lấy danh sách bài viết:', error);
//     return {
//       paths: [],
//       fallback: true,
//     };
//   }
// };

// // Lấy dữ liệu cho từng bài viết cụ thể
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   try {
//     const response = await axios.get(`http://localhost:8080/content/${params?.id}`);
//     const content: Content = response.data;

//     return {
//       props: {
//         content,
//       },
//       revalidate: 10, // Tái tạo trang sau mỗi 10 giây
//     };
//   } catch (error) {
//     console.error('Lỗi khi lấy chi tiết bài viết:', error);
//     return {
//       props: {
//         content: null,
//       },
//     };
//   }
// };

// export default PostDetail;
