import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../Hook/useAxiouSecure';

interface TourGuide {
    _id: string;
    name: string;
    mobileNumber: string;
    email: string;
    experience: string;
    certification: string;
    price: number;
    aboutMe: string;
    image: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }

export const useTourGuideById = (id: string) => {
  const { data, isLoading, error } = useQuery<TourGuide>({
    queryKey: ['TourGuide', id], 
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/becomeTourGider/booking/${id}`); 
      return res.data; 
    },
    enabled: !!id, 
  });

  return { data, isLoading, error };
};
