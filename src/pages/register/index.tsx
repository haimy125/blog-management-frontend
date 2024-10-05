import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/register.module.css"; // Đảm bảo đường dẫn đúng
const Register: React.FC = () => {
    // Định nghĩa interface cho dữ liệu đăng ký
    interface SignUp {
        username: string;
        password: string;
        first_name: string;
        last_name: string;
    }
    // Khởi tạo useState với kiểu dữ liệu SignUp và giá trị khởi tạo mặc định
    const [signup, setSignup] = useState<SignUp>({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
    });

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    // Hàm xử lý thay đổi dữ liệu trong form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/login/signup",
                signup,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Đăng ký thành công:", response.data);
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error) {
            console.error(
                "Lỗi đăng ký:",
                error.response ? error.response.data : error.message
            );
            setError(
                error.response?.data?.desc ||
                    "Đăng ký không thành công. Vui lòng kiểm tra lại."
            ); // Cập nhật lỗi
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}{" "}
            {/* Hiển thị thông báo lỗi */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={signup.username}
                    name="username"
                    onChange={handleChange}
                    placeholder="Username"
                    className={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    value={signup.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="first_name"
                    value={signup.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    className={styles.input}
                />
                <input
                    type="text"
                    name="last_name"
                    value={signup.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
