import { Product, PRODUCTS } from '@/data/products';

export const mockFetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PRODUCTS);
    }, 500);
  });
};
