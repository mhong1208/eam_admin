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

  return {
    ...query,
    createUser: createMutation,
    updateUser: updateMutation,
    deleteUser: deleteMutation,
  };
};
