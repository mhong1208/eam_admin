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

  return {
    ...query,
    createMutation,
  };
};
