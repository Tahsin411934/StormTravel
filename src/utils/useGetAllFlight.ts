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
  

export const useGetAllFlight = () => {
  const { data, isLoading, error } = useQuery<FlightSchedule>({
    queryKey: ['FlightSchedule'], 
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/flight`); 
      return res.data; 
    },
    
  });

  return { data, isLoading, error };
};
