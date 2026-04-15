import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { API_ENDPOINTS } from '@/api/endpoints';

export const useAssetTypes = (filters?: any) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['asset-categories', filters],
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_ENDPOINTS.ASSET_CATEGORIES, { params: filters });
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (newData: any) => axiosInstance.post(API_ENDPOINTS.ASSET_CATEGORIES, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asset-categories'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) =>
      axiosInstance.put(`${API_ENDPOINTS.ASSET_CATEGORIES}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asset-categories'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => axiosInstance.delete(`${API_ENDPOINTS.ASSET_CATEGORIES}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asset-categories'] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string | number; isActive: boolean }) =>
      axiosInstance.put(`${API_ENDPOINTS.ASSET_CATEGORIES}/${id}/status`, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asset-categories'] });
    },
  });

  return {
    ...query,
    createAssetType: createMutation,
    updateAssetType: updateMutation,
    deleteAssetType: deleteMutation,
    updateAssetTypeStatus: updateStatusMutation,
  };
};
