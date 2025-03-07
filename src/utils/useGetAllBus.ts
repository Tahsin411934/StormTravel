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

export const useGetAllBus = () => {
  const { data, isLoading, error } = useQuery<Bus>({
    queryKey: ['GetAllBus'], 
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/bus-schedule`); 
      return res.data; 
    },
   
  });

  return { data, isLoading, error };
};
