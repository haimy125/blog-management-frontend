import axios from "axios";
import { useCallback, useState } from "react";
import { ApiUrl } from "@/constants";
import { ProfileType, UserInfoType } from "@/types";

export const useProfile = (params: UserInfoType) => {
  const [userProfile, setUserProfile] = useState<ProfileType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { token, userId } = params;

  const url = `${ApiUrl}/profile`;

  const fetchProfile = useCallback(async () => {
    try {
      if (!token || !userId) {
        return;
      }

      const response = await axios.get(url, {
        params: { userId }, // Truyền userId qua query parameter
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/plain",
        },
      });

      if (!response?.data) {
        return;
      } else {
        setUserProfile(response?.data.data); // Lưu thông tin user vào state
      }
    } catch (error) {
      setError("Không thể tải thông tin người dùng");
      console.log("error", error);
    }
  }, [token, url, userId]);

  return {
    userProfile,
    error,
    fetchProfile,
  };
};
