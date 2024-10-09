import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

import { useProfile } from "@/hooks";
import { UserInfoType } from "@/types";

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    userId: "",
    token: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const { userProfile, error, fetchProfile } = useProfile({
    token: userInfo.token,
    userId: userInfo.userId,
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      return;
    } else {
      setUserInfo({ userId, token });
    }
  }, [userInfo.userId, userInfo.token]);

  useEffect(() => {
    if (userInfo.userId && userInfo.token) {
      fetchProfile();
    }
  }, [userInfo.userId, userInfo.token, fetchProfile]);

  if (error) return <p>{error}</p>;
  if (!userProfile) return <p className="mt-4 text-center">Đang tải...</p>;

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/profile`, userProfile);
      setIsEditing(false);
      alert("Thông tin đã được cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    }
  };

  return (
    <div>
      <div className="max-w-3xl p-6 mx-auto mt-16 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">
          {isEditing ? "Chỉnh sửa thông tin" : "Thông tin người dùng"}
        </h1>
        <div className="flex justify-center mb-6">
          <Image
            src={userProfile.avatar || "/default-avatar.svg"}
            alt="Avatar"
            width={120}
            height={120}
            className="border-4 border-blue-500 rounded-full shadow-lg"
          />
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              Tên người dùng:
              <input
                type="text"
                value={userProfile.username}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, username: e.target.value })
                }
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-md transition duration-300 focus:outline-none ${
                  isEditing
                    ? "border-gray-400 focus:border-blue-500"
                    : "bg-gray-100"
                }`}
              />
            </label>

            <label className="block">
              Họ:
              <input
                type="text"
                value={userProfile.firstName}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, firstName: e.target.value })
                }
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-md transition duration-300 focus:outline-none ${
                  isEditing
                    ? "border-gray-400 focus:border-blue-500"
                    : "bg-gray-100"
                }`}
              />
            </label>

            <label className="block">
              Tên:
              <input
                type="text"
                value={userProfile.lastName}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, lastName: e.target.value })
                }
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-md transition duration-300 focus:outline-none ${
                  isEditing
                    ? "border-gray-400 focus:border-blue-500"
                    : "bg-gray-100"
                }`}
              />
            </label>

            <label className="block">
              Giới tính:
              <input
                type="text"
                value={userProfile.sex}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, sex: e.target.value })
                }
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-md transition duration-300 focus:outline-none ${
                  isEditing
                    ? "border-gray-400 focus:border-blue-500"
                    : "bg-gray-100"
                }`}
              />
            </label>

            <label className="block">
              Ngày sinh:
              <input
                type="date"
                value={userProfile.dateOfBirth}
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    dateOfBirth: e.target.value,
                  })
                }
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-md transition duration-300 focus:outline-none ${
                  isEditing
                    ? "border-gray-400 focus:border-blue-500"
                    : "bg-gray-100"
                }`}
              />
            </label>

            <label className="block">
              Địa chỉ:
              <input
                type="text"
                value={userProfile.address}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, address: e.target.value })
                }
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-md transition duration-300 focus:outline-none ${
                  isEditing
                    ? "border-gray-400 focus:border-blue-500"
                    : "bg-gray-100"
                }`}
              />
            </label>

            <label className="block">
              Bio:
              <textarea
                value={userProfile.bio}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, bio: e.target.value })
                }
                disabled={!isEditing}
                className={`mt-1 p-2 border rounded-md transition duration-300 focus:outline-none ${
                  isEditing
                    ? "border-gray-400 focus:border-blue-500"
                    : "bg-gray-100"
                }`}
              />
            </label>
          </div>

          <h2 className="mt-4 text-xl font-semibold text-gray-800">Danh bạ</h2>
          <ul className="ml-5 space-y-2 list-disc">
            {userProfile.contactsResponseDTOSet.map((contact, index) => (
              <li key={index} className="text-gray-700">
                {contact.contactType}:{" "}
                <span className="font-medium">{contact.contactValue}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleEditToggle}
              className="px-6 py-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
            >
              {isEditing ? "Hủy" : "Chỉnh sửa"}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="px-6 py-2 text-white transition duration-300 bg-green-500 rounded-md hover:bg-green-600"
              >
                Lưu
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
