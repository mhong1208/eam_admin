import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { API_ENDPOINTS } from '@/api/endpoints';

export const useLocations = (filters?: any) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['locations', filters],
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_ENDPOINTS.LOCATIONS, { params: filters });
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (newData: any) => axiosInstance.post(API_ENDPOINTS.LOCATIONS, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) => 
      axiosInstance.put(`${API_ENDPOINTS.LOCATIONS}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => axiosInstance.delete(`${API_ENDPOINTS.LOCATIONS}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string | number; isActive: boolean }) =>
      axiosInstance.put(`${API_ENDPOINTS.LOCATIONS}/${id}/status`, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
  });

  return {
    ...query,
    createLocation: createMutation,
    updateLocation: updateMutation,
    deleteLocation: deleteMutation,
    updateLocationStatus: updateStatusMutation,
  };
};
