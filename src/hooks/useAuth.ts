import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { API_ENDPOINTS } from '@/api/endpoints';
import { useAuthStore } from '@/store/useAuthStore';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const logoutStore = useAuthStore((state) => state.logout);

  const loginMutation = useMutation({
    mutationFn: async (credentials: any) => {
      const { data } = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
      return data;
    },
    onSuccess: (data) => {
      const { user, accessToken } = data;
      localStorage.setItem('access_token', accessToken);
      setAuth(user, accessToken);
      message.success('Đăng nhập thành công!');
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Đăng nhập thất bại');
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: any) => {
      const { data } = await axiosInstance.post(API_ENDPOINTS.REGISTER, userData);
      return data;
    },
    onSuccess: () => {
      message.success('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Đăng ký thất bại');
    },
  });

  const logout = () => {
    localStorage.removeItem('access_token');
    logoutStore();
    navigate('/login');
  };

  return {
    login: loginMutation,
    register: registerMutation,
    logout,
  };
};
