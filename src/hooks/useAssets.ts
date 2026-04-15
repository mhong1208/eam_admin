import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { API_ENDPOINTS } from '@/api/endpoints';

export interface Asset {
  id: number | string;
  code: string;
  name: string;
  serialNumber?: string;
  categoryId?: number | string;
  locationId?: number | string;
  vendorId?: number | string;
  purchasePrice?: number;
  purchaseDate?: string;
  warrantyEndDate?: string;
  description?: string;
  isActive: boolean;
  status?: string;
}
export const useAssetLoadAll = () => {
  return useQuery<Asset[]>({
    queryKey: ['assets-all'],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`${API_ENDPOINTS.ASSETS}/load-data`);
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
export const useAssets = (filters?: any) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['assets', filters],
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_ENDPOINTS.ASSETS, { params: filters });
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (newData: any) => axiosInstance.post(API_ENDPOINTS.ASSETS, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) =>
      axiosInstance.put(`${API_ENDPOINTS.ASSETS}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => axiosInstance.delete(`${API_ENDPOINTS.ASSETS}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });

  const importMutation = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return axiosInstance.post(`${API_ENDPOINTS.ASSETS}/import`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });

  return {
    ...query,
    createAsset: createMutation,
    updateAsset: updateMutation,
    deleteAsset: deleteMutation,
    importAsset: importMutation
  };
};
