/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

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
    } catch (error: any) {
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
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Your Company Logo"
          src="hm.svg"
          width={48}
          height={48}
          unoptimized
          className="w-auto h-10 mx-auto"
        />
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
          Register
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={signup.username}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={signup.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={signup.first_name}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={signup.first_name}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {error && (
            <p className="px-4 py-2 text-white sm:px-8 sm:py-3 bg-sky-700 hover:bg-sky-800">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
