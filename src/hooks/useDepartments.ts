import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { API_ENDPOINTS } from '@/api/endpoints';

export interface Department {
  id: number | string;
  code: string;
  name: string;
  description?: string;
}

export const useDepartmentLoadAll = () => {
  return useQuery<Department[]>({
    queryKey: ['departments-all'],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`${API_ENDPOINTS.DEPARTMENTS}/load-data`);
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useDepartments = (filters?: any) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['departments', filters],
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_ENDPOINTS.DEPARTMENTS, { params: filters });
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (newData: any) => axiosInstance.post(API_ENDPOINTS.DEPARTMENTS, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) =>
      axiosInstance.put(`${API_ENDPOINTS.DEPARTMENTS}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => axiosInstance.delete(`${API_ENDPOINTS.DEPARTMENTS}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string | number; isActive: boolean }) =>
      axiosInstance.put(`${API_ENDPOINTS.DEPARTMENTS}/${id}/status`, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
  const importMutation = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return axiosInstance.post(`${API_ENDPOINTS.DEPARTMENTS}/import`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  return {
    ...query,
    createDepartment: createMutation,
    updateDepartment: updateMutation,
    deleteDepartment: deleteMutation,
    importDepartments: importMutation,
    updateDepartmentStatus: updateStatusMutation,
  };
};
