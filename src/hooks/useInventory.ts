import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';

export const useInventory = () => {
    const queryClient = useQueryClient();

    // Lấy danh sách tồn kho
    const getStocks = useQuery({
        queryKey: ['stocks'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/inventory');
            return data;
        },
    });

    // Mutation cho Adjustment (Cập nhật dữ liệu)
    const adjustStock = useMutation({
        mutationFn: (adjData: any) => axiosInstance.post('/adjustments', adjData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stocks'] }); // Tự động làm mới bảng sau khi sửa
        },
    });

    return { getStocks, adjustStock };
};