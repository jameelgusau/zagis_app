"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { axiosPrivate } from "@/lib/axios";
import { useAuthStore } from "@/store/auth-store";
import { useRefreshToken } from "./useRefreshToken";


export const useAxiosPrivate = () => {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const logout = useAuthStore((s) => s.clearAuth);
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization && accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        // If refresh endpoint itself fails → logout
        if (prevRequest?.url?.includes("/refresh")) {
          logout();
          router.replace("/login");
          return Promise.reject(error);
        }

        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 403) &&
          !prevRequest?._retry
        ) {
          prevRequest._retry = true;

          try {
            const newAccessToken = await refresh();
            prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          } catch (refreshError) {
            //Refresh failed → logout
            logout();
            router.replace("/login");
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh, logout, router]);

  return axiosPrivate;
};