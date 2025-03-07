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

export const useAccessory = (id: string) => {
  const { data, isLoading, error } = useQuery<Accessory>({
    queryKey: ['accessory', id], // Use id to create a unique queryKey
    queryFn: async () => {
      const response = await fetch(`https://share-trip-serverv1.vercel.app/api/accessories/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    }
  });

  return { data, isLoading, error };
};
