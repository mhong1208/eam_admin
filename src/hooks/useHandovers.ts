import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { API_ENDPOINTS } from '@/api/endpoints';

export interface Handover {
  id: string | number;
  assetId?: string | number;
  // TODO: Add other relevant fields of Handover
  userId?: string | number;
  handoverDate?: string;
  notes?: string;
  status?: string;
  [key: string]: any;
}

export const useHandovers = (filters?: any) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['handovers', filters],
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_ENDPOINTS.HANDOVERS, { params: filters });
      return data;
    },
  });

  const getHandoverById = (id: string) => {
    return useQuery({
      queryKey: ['handovers', id],
      queryFn: async () => {
        const { data } = await axiosInstance.get(`${API_ENDPOINTS.HANDOVERS}/${id}`);
        return data;
      },
      enabled: !!id,
    });
  };

  const createMutation = useMutation({
    mutationFn: (newData: any) => axiosInstance.post(API_ENDPOINTS.HANDOVERS, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['handovers'] });
    },
  });

  return {
    ...query,
    getHandoverById,
    createHandover: createMutation,
  };
};
