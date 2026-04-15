import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { API_ENDPOINTS } from '@/api/endpoints';

export const useSuppliers = (filters?: any) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['suppliers', filters],
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_ENDPOINTS.SUPPLIERS, { params: filters });
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (newData: any) => axiosInstance.post(API_ENDPOINTS.SUPPLIERS, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) => 
      axiosInstance.put(`${API_ENDPOINTS.SUPPLIERS}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => axiosInstance.delete(`${API_ENDPOINTS.SUPPLIERS}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string | number; isActive: boolean }) =>
      axiosInstance.put(`${API_ENDPOINTS.SUPPLIERS}/${id}/status`, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
  });

  return {
    ...query,
    createSupplier: createMutation,
    updateSupplier: updateMutation,
    deleteSupplier: deleteMutation,
    updateSupplierStatus: updateStatusMutation,
  };
};
