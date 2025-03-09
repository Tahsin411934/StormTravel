import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../Hook/useAxiouSecure';

interface Category {
    _id: string;
    busNumber: string;
    busName: string;
    description: string;
}

export const useGetBus = () => {
    const { data, isLoading, error, refetch } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await axiosSecure.get('/api/buses');
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