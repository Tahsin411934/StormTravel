import { useQuery } from '@tanstack/react-query';


interface Accessory {
    _id: string;
    productName: string;
    price: number;
    discount: number;
    description: string;
    imgUrl: string;
    category: string;
    available: string;
  }

export const useGetAccessories = () => {
  const { data, isLoading, error } = useQuery<Accessory[]>({
    queryKey: ['Package'],
    queryFn: async () => {
      const response = await fetch('https://share-trip-serverv1.vercel.app/api/accessories');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    },
  });

  return { data, isLoading, error };
};
