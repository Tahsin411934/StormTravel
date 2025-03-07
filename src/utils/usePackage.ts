import { useQuery } from '@tanstack/react-query';


interface Package {
    _id: string;
    name: string;
    image: string;
    description: string;
    duration: string;
    discount: number;
    price: number;
  }

export const usePackage = () => {
  const { data, isLoading, error } = useQuery<Package[]>({
    queryKey: ['Package'],
    queryFn: async () => {
      const response = await fetch('https://share-trip-serverv1.vercel.app/api/package/activePackage');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    },
  });

  return { data, isLoading, error };
};
