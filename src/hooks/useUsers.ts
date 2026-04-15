import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { API_ENDPOINTS } from '@/api/endpoints';

export const useUsers = (filters?: any) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['users', filters],
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_ENDPOINTS.USERS, { params: filters });
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (newData: any) => axiosInstance.post(API_ENDPOINTS.USERS, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) => 
      axiosInstance.put(`${API_ENDPOINTS.USERS}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => axiosInstance.delete(`${API_ENDPOINTS.USERS}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const createAccountMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: { username: string; password: string } }) =>
      axiosInstance.post(`${API_ENDPOINTS.USERS}/${id}/account`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: { newPassword: string } }) =>
      axiosInstance.post(`${API_ENDPOINTS.USERS}/${id}/reset-password`, data),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string | number; isActive: boolean }) =>
      axiosInstance.put(`${API_ENDPOINTS.USERS}/${id}/status`, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    ...query,
    createUser: createMutation,
    updateUser: updateMutation,
    deleteUser: deleteMutation,
    createAccount: createAccountMutation,
    resetPassword: resetPasswordMutation,
    updateUserStatus: updateStatusMutation,
  };
};
