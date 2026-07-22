import { useAuthStore } from "@/store/auth-store";
import { APIS } from "@/lib/config";
import axios from "@/lib/axios";

export const useRefreshToken = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  const refresh = async () => {
    try {
      const response = await axios.post(
        APIS.refreshtoken.path,
        {},
        { withCredentials: true }
      );

      if (response.data.meta.status !== 200) {
        throw new Error("Refresh failed");
      }

      const { data } = response.data;

      setAuth(
        {
          id: data.id,
          email: data.email,
          full_name: data.full_name,
          phone: data.phone,
          role: data.role,
          department_id: data.department_id,
          rank_id: data.rank_id,
          rank_name: data.rank_name,
          department_name: data.department,
          image: data.image,
          link: data.link,
        },
        data.jwtToken
      );

      return data.jwtToken;
    } catch (err) {
      throw err;
    }
  };

  return refresh;
};