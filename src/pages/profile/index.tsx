import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (userId) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/profile`, {
            params: { userId }, // Truyền userId qua query parameter
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserProfile(response.data.data); // Lưu thông tin user vào state
        } catch (error) {
          setError("Không thể tải thông tin người dùng");
        } finally {
        }
      };

      fetchProfile();
    } else {
      setError("User ID không tồn tại trong localStorage");
    }
  }, []);

  if (error) return <p>{error}</p>;
  if (!userProfile) return <p className="text-center mt-4">Đang tải...</p>;
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
      <div className="max-w-3xl mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          {isEditing ? "Chỉnh sửa thông tin" : "Thông tin người dùng"}
        </h1>
        <div className="flex justify-center mb-6">
          <Image
            src={userProfile.avatar || "/default-avatar.svg"}
            alt="Avatar"
            width={120}
            height={120}
            className="rounded-full border-4 border-blue-500 shadow-lg"
          />
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <ul className="list-disc ml-5 space-y-2">
            {userProfile.contactsResponseDTOSet.map((contact, index) => (
              <li key={index} className="text-gray-700">
                {contact.contactType}:{" "}
                <span className="font-medium">{contact.contactValue}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleEditToggle}
              className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {isEditing ? "Hủy" : "Chỉnh sửa"}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-300"
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
