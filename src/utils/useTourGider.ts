import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface Guide {
  _id: string;
  name: string;
  image: string;
  experience: string;
  certification: string;
  aboutMe: string;
}

export const useTourGider = () => {
  const { data, isLoading, error } = useQuery<Guide[]>({
    queryKey: ['tourGuider'],
    queryFn: async () => {
      const response = await fetch('https://share-trip-serverv1.vercel.app/api/becomeTourGider');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    },
  });

  return { data, isLoading, error };
};
