// pages/index.tsx
import { useRouter } from "next/router";
import { useState } from "react";

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

    return (
        <div>
            <h1>Chào mừng bạn đến với bình nguyên vô tận!!!</h1>
            <button onClick={handleWritePost} disabled={isCheckToken}>
                {isCheckToken ? "Đang kiểm tra" : "Viết bài"}
            </button>
        </div>
    );
};

export default Home;
