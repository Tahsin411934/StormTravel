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
  
  

export const useGetTrain = () => {
  const { data, isLoading, error } = useQuery<TrainSchedule>({
    queryKey: ['TrainSchedule'], 
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/train-schedule/`); 
      return res.data; 
    },
    
  });

  return { data, isLoading, error };
};
