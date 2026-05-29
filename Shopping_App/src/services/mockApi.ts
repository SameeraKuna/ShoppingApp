import { Product } from '@/data/products';

const COLORS = ['tan', 'sage', 'cream', 'charcoal', 'navy', 'rose'];

interface DummyProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: number;
  thumbnail: string;
  images?: string[];
}

const getCategoryName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    electronics: 'Electronics',
    jewelery: 'Jewelery',
    'mens clothing': 'Mens',
    'womens clothing': 'Womens',
    beauty: 'Beauty',
    fragrances: 'Fragrances',
    furniture: 'Furniture',
    groceries: 'Groceries',
  };
  const normalized = category.toLowerCase();
  return categoryMap[normalized] || normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

const mapDummyProductToProduct = (dummyProduct: DummyProduct): Product => ({
  id: dummyProduct.id.toString(),
  name: dummyProduct.title,
  price: Math.round(dummyProduct.price),
  category: getCategoryName(dummyProduct.category),
  rating: Math.round(dummyProduct.rating * 10) / 10,
  reviewCount: Math.floor(Math.random() * 250) + 20,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  image: dummyProduct.images?.[0] || dummyProduct.thumbnail,
});

export const mockFetchProducts = async (): Promise<Product[]> => {
  try {
    console.log('Fetching products from DummyJSON...');
    const response = await fetch('https://dummyjson.com/products?limit=30');
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    console.log('DummyJSON Response:', data);

    const mappedProducts = data.products.map(mapDummyProductToProduct);
    console.log('Mapped Products:', mappedProducts);
    console.log('Total products loaded:', mappedProducts.length);

    return mappedProducts;
  } catch (error) {
    console.error('Error fetching products from DummyJSON:', error);
    throw new Error('Failed to fetch products');
  }
};
