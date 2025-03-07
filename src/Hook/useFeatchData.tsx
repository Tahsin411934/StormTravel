import { useQuery } from '@tanstack/react-query';

interface Accessory {
    productName: string;
    price: number;
    discount?: number;
    description: string;
    imgUrl: string;
    finalPrice?: number; // New field for the calculated price after discount
}

export const useFetchData = () => {
    const { data, isLoading, error } = useQuery<Accessory[]>({
        queryKey: ['data'],
        queryFn: async () => {
            const response = await fetch('https://share-trip-serverv1.vercel.app/api/accessories');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const accessories: Accessory[] = await response.json();

            // Calculate discounted price
            return accessories.map(accessory => ({
                ...accessory,
                finalPrice: accessory.discount
                    ? accessory.price - (accessory.price * accessory.discount) / 100
                    : accessory.price,
            }));
        }
    });

    return { data, isLoading, error };
};
