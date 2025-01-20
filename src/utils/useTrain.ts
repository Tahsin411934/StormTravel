import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../Hook/useAxiouSecure';

interface TrainSchedule {
    trainNumber: string;
    trainName: string;
    type: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    Shovon_chair: number;
    First_class_chair: number;
    First_class: number;
    AC: number;
    price: number;
    date: string;
  }
  
  

export const useTrain = (id: string) => {
  const { data, isLoading, error } = useQuery<TrainSchedule>({
    queryKey: ['TrainSchedule', id], 
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/train-schedule/${id}`); 
      return res.data; 
    },
    enabled: !!id, 
  });

  return { data, isLoading, error };
};
