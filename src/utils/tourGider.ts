import { useQuery } from '@tanstack/react-query';
import React from 'react'
interface Guide {
    _id: string;
    name: string;
    image: string;
    experience:string;
  }
export const tourGider = () => {
    const { data, isLoading, error } = useQuery<Guide[]>({
        queryKey: ['tourGuider'],
        queryFn: async () => {
          const response = await fetch('http://localhost:5000/api/becomeTourGider');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return await response.json();
        }
      });
  return [data, isLoading, error]
}
