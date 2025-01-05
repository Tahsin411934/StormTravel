import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../Hook/useAxiouSecure';

interface Package {
  _id: string;
  name: string;
  image: string;
  description: string;
  duration: string;
  discount: number;
  price: number;
}

export const usePackageById = (id: string) => {
  const { data, isLoading, error } = useQuery<Package>({
    queryKey: ['Package', id], 
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/package/${id}`); 
      return res.data; 
    },
    enabled: !!id, 
  });

  return { data, isLoading, error };
};
