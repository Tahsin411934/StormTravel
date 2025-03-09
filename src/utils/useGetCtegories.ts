import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../Hook/useAxiouSecure';

interface Category {
    _id: string;
    category_name: string;
    description: string;
}

export const useGetCategories = () => {
    const { data, isLoading, error, refetch } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await axiosSecure.get('/api/categories');
            return response.data;
        },
    });

    return {
        data,
        isLoading,
        error,
        refetch,
    };
};