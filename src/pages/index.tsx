// pages/index.tsx
import { useRouter } from "next/router";
import { useState } from "react";
import NewsFeed from "../components/NewsFeed";
import HeaderMenu from "../components/HeaderMenu";

const Home: React.FC = () => {
  const router = useRouter();
  const [isCheckToken, setIsCheckToken] = useState(false);

  const handleWritePost = () => {
    setIsCheckToken(true); // Bắt đầu kiểm tra token
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      router.push("/posts");
    }
    setIsCheckToken(false); // Kết thúc kiểm tra token
  };

  // return (
  //   <div className="max-w-3xl p-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
  //     <div className="">
  //       <div className="p-6 text-center bg-gray-100 rounded-lg shadow-md">
  //         <h1 className="p-4 mb-4 text-3xl font-bold text-center text-white text-gray-800 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-500">
  //           Chào mừng bạn đến với bình nguyên vô tận!!!
  //         </h1>
  //         <button
  //           onClick={handleWritePost}
  //           disabled={isCheckToken}
  //           className={`px-8 py-4 text-xl font-semibold text-white rounded-full transition duration-300 ease-in-out
  //             ${
  //               isCheckToken
  //                 ? "bg-gray-400 cursor-not-allowed"
  //                 : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
  //             }
  //             shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50`}
  //         >
  //           {isCheckToken ? "Đang kiểm tra" : "Viết bài"}
  //         </button>
  //       </div>
  //       <NewsFeed />
  //     </div>
  //   </div>
  // );
};
const MainContent = () => {
  const router = useRouter();
  const [isCheckToken, setIsCheckToken] = useState(false);

  const handleWritePost = () => {
    setIsCheckToken(true); // Bắt đầu kiểm tra token
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      router.push("/posts");
    }
    setIsCheckToken(false); // Kết thúc kiểm tra token
  };
  return (
    <div className="max-w-3xl mt-16 p-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg transition duration-500 ease-in-out ">
      <div className="p-6 text-center bg-gray-100 rounded-lg shadow-md">
        <h1 className="p-4 mb-4 text-3xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
          Chào mừng bạn đến với bình nguyên vô tận!!!
        </h1>
        <button
          onClick={handleWritePost}
          disabled={isCheckToken}
          className={`px-8 py-4 text-xl font-semibold text-white rounded-full transition duration-300 ease-in-out 
            ${
              isCheckToken
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            } 
            shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50`}
        >
          {isCheckToken ? "Đang kiểm tra" : "Viết bài"}
        </button>
      </div>
      <NewsFeed />
    </div>
  );
};
const App = () => {
  return (
    <>
      <MainContent />
    </>
  );
};
export default App;
