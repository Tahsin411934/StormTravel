import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../Hook/useAxiouSecure';

interface Bus {
    busNumber: string;
    busName: string;
    class: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    seatsAvailable: number;
    price: number;
    date: string;
  }

export const useBus = (id: string) => {
  const { data, isLoading, error } = useQuery<Bus>({
    queryKey: ['TourGuide', id], 
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/bus-schedule/${id}`); 
      return res.data; 
    },
    enabled: !!id, 
  });

  return { data, isLoading, error };
};
