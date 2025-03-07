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
  finalPrice?: number; // Add optional finalPrice
}

export const useAccessoriesByCategory = (category: string) => {
  const { data, isLoading, error } = useQuery<Accessory[]>({
    queryKey: ['accessory', category], // Use category for a unique query key
    queryFn: async () => {
      const response = await fetch(`https://share-trip-serverv1.vercel.app/api/accessories/relate/${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch related accessories');
      }
      const accessories: Accessory[] = await response.json();
      // Add finalPrice calculation for each accessory
      return accessories.map(accessory => ({
        ...accessory,
        finalPrice: accessory.discount
          ? accessory.price - (accessory.price * accessory.discount) / 100
          : accessory.price,
      }));
    },
    enabled: !!category, // Ensures the query runs only when category is valid
  });

  return { relatedData: data, relatedLoading: isLoading, relatedError: error };
};
