import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../Hook/useAxiouSecure';

interface FlightSchedule {
    
    flightNumber: string;
    flightName: string;
    class: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    seatsAvailable: number;
    price: number;
    date: string;
  }
  

export const useFlight = (id: string) => {
  const { data, isLoading, error } = useQuery<FlightSchedule>({
    queryKey: ['TourGuide', id], 
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/flight/${id}`); 
      return res.data; 
    },
    enabled: !!id, 
  });

  return { data, isLoading, error };
};
