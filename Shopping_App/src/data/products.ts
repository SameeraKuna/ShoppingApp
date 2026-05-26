/**
 * Product Database
 *
 * 20 Products organized by category for filtering:
 * - SOFT GOODS (5): Throws, Pillowcases, Cushions, Blankets, Towels
 * - CERAMICS (3): Mugs, Bowls, Plates
 * - CANDLES (2): Scented candles
 * - TABLETOP (4): Cutting boards, Coasters, Utensils, Dinnerware
 * - HOME (4): Vases, Planters, Decor items
 * - BEAUTY (2): Natural soaps, Bath products
 *
 * Images are included in both PRODUCTS (grid view) and PRODUCT_DETAILS (detail view).
 * NOTE: Update image URLs with specific Shopify Stock Photos links for your preferred imagery.
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  reviewCount: number;
  color: string;
  image?: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  price: number;
  breadcrumb: string;
  rating: number;
  reviewCount: number;
  colors: { label: string; value: string }[];
  sizes: { label: string; value: string }[];
  description: string;
  freeDelivery: boolean;
  image?: string;
}

export const PRODUCTS: Product[] = [
  // SOFT GOODS (5 products)
  {
    id: '1',
    name: 'Linen Throw',
    price: 48,
    category: 'SOFT GOODS',
    rating: 4.8,
    reviewCount: 124,
    color: 'tan',
    image: 'https://images.pexels.com/photos/3944667/pexels-photo-3944667.jpeg?w=600&h=600&fit=crop',
  },
  {
    id: '2',
    name: 'Linen Pillowcase',
    price: 35,
    category: 'SOFT GOODS',
    rating: 4.8,
    reviewCount: 145,
    color: 'sage',
    image: 'https://images.pexels.com/photos/5632641/pexels-photo-5632641.jpeg?w=600&h=600&fit=crop',
  },
  {
    id: '3',
    name: 'Bouclé Cushion',
    price: 64,
    category: 'SOFT GOODS',
    rating: 4.7,
    reviewCount: 203,
    color: 'sage',
    image: 'https://images.pexels.com/photos/6489662/pexels-photo-6489662.jpeg?w=600&h=600&fit=crop',
  },
  {
    id: '4',
    name: 'Merino Wool Blanket',
    price: 95,
    category: 'SOFT GOODS',
    rating: 5.0,
    reviewCount: 89,
    color: 'sage',
    image: 'https://images.pexels.com/photos/4585299/pexels-photo-4585299.jpeg?w=600&h=600&fit=crop',
  },
  {
    id: '5',
    name: 'Cotton Tea Towels',
    price: 18,
    category: 'SOFT GOODS',
    rating: 4.9,
    reviewCount: 178,
    color: 'tan',
    image: 'https://images.pexels.com/photos/3642498/pexels-photo-3642498.jpeg?w=600&h=600&fit=crop',
  },

  // CERAMICS (3 products)
  {
    id: '6',
    name: 'Stoneware Mug',
    price: 22,
    category: 'CERAMICS',
    rating: 4.8,
    reviewCount: 89,
    color: 'cream',
    image: 'https://images.pexels.com/photos/8535498/pexels-photo-8535498.jpeg?w=600&h=600&fit=crop',
  },
  {
    id: '7',
    name: 'Ceramic Bowl Set',
    price: 58,
    category: 'CERAMICS',
    rating: 4.9,
    reviewCount: 67,
    color: 'cream',
    image: 'https://images.pexels.com/photos/3407681/pexels-photo-3407681.jpeg?w=600&h=600&fit=crop',
  },
  {
    id: '8',
    name: 'Handmade Plate Set',
    price: 72,
    category: 'CERAMICS',
    rating: 4.9,
    reviewCount: 55,
    color: 'cream',
    image: 'https://images.pexels.com/photos/3407680/pexels-photo-3407680.jpeg?w=600&h=600&fit=crop',
  },

  // CANDLES (2 products)
  {
    id: '9',
    name: 'Cedar Candle',
    price: 32,
    category: 'CANDLES',
    rating: 4.9,
    reviewCount: 156,
    color: 'tan',
    image: 'https://images.pexels.com/photos/4194846/pexels-photo-4194846.jpeg?w=600&h=600&fit=crop',
  },
  {
    id: '10',
    name: 'Lavender Soy Candle',
    price: 28,
    category: 'CANDLES',
    rating: 4.7,
    reviewCount: 98,
    color: 'cream',
    image: 'https://images.pexels.com/photos/3955650/pexels-photo-3955650.jpeg?w=600&h=600&fit=crop',
  },

  // TABLETOP (4 products)
  {
    id: '11',
    name: 'Wooden Cutting Board',
    price: 42,
    category: 'TABLETOP',
    rating: 4.7,
    reviewCount: 98,
    color: 'tan',
    image: 'https://images.pexels.com/photos/5831/wood-kitchen-cooking-cook.jpg?w=600&h=600&fit=crop',
  },
  {
    id: '12',
    name: 'Marble Coaster Set',
    price: 28,
    category: 'TABLETOP',
    rating: 4.9,
    reviewCount: 112,
    color: 'cream',
    image: 'https://images.pexels.com/photos/3407691/pexels-photo-3407691.jpeg?w=600&h=600&fit=crop',
  },
  {
    id: '13',
    name: 'Bamboo Utensil Set',
    price: 24,
    category: 'TABLETOP',
    rating: 4.6,
    reviewCount: 134,
    color: 'tan',
    image: 'https://images.pexels.com/photos/4099254/pexels-photo-4099254.jpeg?w=600&h=600&fit=crop',
  },
  {
    id: '14',
    name: 'Linen Table Runner',
    price: 45,
    category: 'TABLETOP',
    rating: 4.8,
    reviewCount: 76,
    color: 'sage',
    image: 'https://images.pexels.com/photos/5632632/pexels-photo-5632632.jpeg?w=600&h=600&fit=crop',
  },

  // HOME (4 products)
  {
    id: '15',
    name: 'Glass Vase Trio',
    price: 52,
    category: 'HOME',
    rating: 4.8,
    reviewCount: 76,
    color: 'cream',
    image: 'https://images.pexels.com/photos/3428498/pexels-photo-3428498.jpeg?w=600&h=600&fit=crop',
  },
  {
    id: '16',
    name: 'Terrazzo Planter',
    price: 38,
    category: 'HOME',
    rating: 4.7,
    reviewCount: 103,
    color: 'sage',
    image: 'https://images.pexels.com/photos/4503269/pexels-photo-4503269.jpeg?w=600&h=600&fit=crop',
  },
  {
    id: '17',
    name: 'Ceramic Wall Hanging',
    price: 55,
    category: 'HOME',
    rating: 4.8,
    reviewCount: 64,
    color: 'cream',
    image: 'https://images.pexels.com/photos/3556070/pexels-photo-3556070.jpeg?w=600&h=600&fit=crop',
  },
  {
    id: '18',
    name: 'Macramé Wall Art',
    price: 48,
    category: 'HOME',
    rating: 4.9,
    reviewCount: 91,
    color: 'tan',
    image: 'https://images.pexels.com/photos/4968389/pexels-photo-4968389.jpeg?w=600&h=600&fit=crop',
  },

  // BEAUTY (2 products)
  {
    id: '19',
    name: 'Natural Soap Gift Set',
    price: 36,
    category: 'BEAUTY',
    rating: 4.8,
    reviewCount: 92,
    color: 'cream',
    image: 'https://images.pexels.com/photos/3735659/pexels-photo-3735659.jpeg?w=600&h=600&fit=crop',
  },
  {
    id: '20',
    name: 'Organic Bath Bombs',
    price: 32,
    category: 'BEAUTY',
    rating: 4.7,
    reviewCount: 87,
    color: 'sage',
    image: 'https://images.pexels.com/photos/3906857/pexels-photo-3906857.jpeg?w=600&h=600&fit=crop',
  },
];

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  '1': {
    id: '1',
    name: 'Linen Throw',
    price: 48,
    breadcrumb: 'Home > Soft Goods > Linen Throw',
    rating: 4.8,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop&q=80',
    colors: [
      { label: 'Oat', value: '#E8DCC8' },
      { label: 'Sage', value: '#C5D9C0' },
      { label: 'Taupe', value: '#D4CCC0' },
      { label: 'Navy', value: '#2C3E50' },
      { label: 'Rose', value: '#E8C5C5' },
    ],
    sizes: [
      { label: '50×60', value: '50x60' },
      { label: '60×80', value: '60x80' },
      { label: '80×100', value: '80x100' },
    ],
    description:
      'Made from 100% linen, this throw is perfect for adding warmth and texture to any room. Hand-loomed in Portugal with sustainable practices.',
    freeDelivery: true,
  },
  '2': {
    id: '2',
    name: 'Linen Pillowcase',
    price: 35,
    breadcrumb: 'Home > Soft Goods > Pillowcase',
    rating: 4.8,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1559132173-8be0a4a56431?w=600&h=600&fit=crop&q=80',
    colors: [
      { label: 'Sage', value: '#C5D9C0' },
      { label: 'Cream', value: '#F5F1E8' },
      { label: 'Taupe', value: '#D4CCC0' },
    ],
    sizes: [
      { label: 'Standard (20"×26")', value: 'standard' },
      { label: 'Queen (20"×30")', value: 'queen' },
    ],
    description:
      'Premium Belgian linen pillowcase. Naturally breathable and temperature-regulating. Softens with every wash.',
    freeDelivery: true,
  },
  '3': {
    id: '3',
    name: 'Bouclé Cushion',
    price: 64,
    breadcrumb: 'Home > Soft Goods > Bouclé Cushion',
    rating: 4.7,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=600&fit=crop&q=80',
    colors: [
      { label: 'Sage', value: '#C5D9C0' },
      { label: 'Cream', value: '#F5F1E8' },
      { label: 'Charcoal', value: '#3A3A3A' },
    ],
    sizes: [
      { label: '18×18', value: '18x18' },
      { label: '20×20', value: '20x20' },
    ],
    description:
      'Textured bouclé fabric with a soft feel. Removable cover. Pairs perfectly with the Linen Throw.',
    freeDelivery: true,
  },
  '4': {
    id: '4',
    name: 'Merino Wool Blanket',
    price: 95,
    breadcrumb: 'Home > Soft Goods > Blanket',
    rating: 5.0,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop&q=80',
    colors: [
      { label: 'Natural', value: '#E8D4B8' },
      { label: 'Charcoal', value: '#3A3A3A' },
      { label: 'Sage', value: '#C5D9C0' },
    ],
    sizes: [
      { label: 'Throw (50"×60")', value: 'throw' },
      { label: 'Full (60"×80")', value: 'full' },
    ],
    description:
      'Luxurious New Zealand merino wool blanket. Naturally thermoregulating and hypoallergenic. Machine washable.',
    freeDelivery: true,
  },
  '5': {
    id: '5',
    name: 'Cotton Tea Towels',
    price: 18,
    breadcrumb: 'Home > Soft Goods > Towels',
    rating: 4.9,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=600&h=600&fit=crop&q=80',
    colors: [
      { label: 'Cream', value: '#F5F1E8' },
      { label: 'Sage', value: '#C5D9C0' },
      { label: 'Charcoal', value: '#3A3A3A' },
    ],
    sizes: [
      { label: 'Single', value: 'single' },
      { label: 'Set of 3', value: 'three' },
    ],
    description:
      'Premium organic cotton tea towels. Absorbent and quick-drying. Perfect for kitchen use or as a gift.',
    freeDelivery: true,
  },
  '6': {
    id: '6',
    name: 'Stoneware Mug',
    price: 22,
    breadcrumb: 'Home > Ceramics > Stoneware Mug',
    rating: 4.8,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=600&h=600&fit=crop&q=80',
    colors: [
      { label: 'Cream', value: '#F5F1E8' },
      { label: 'Sage', value: '#C5D9C0' },
      { label: 'Charcoal', value: '#3A3A3A' },
    ],
    sizes: [
      { label: 'Small (8oz)', value: 'small' },
      { label: 'Large (12oz)', value: 'large' },
    ],
    description:
      'Hand-thrown stoneware mug with a comfortable grip. Microwave and dishwasher safe. Crafted by local artisans.',
    freeDelivery: true,
  },
  '7': {
    id: '7',
    name: 'Ceramic Bowl Set',
    price: 58,
    breadcrumb: 'Home > Ceramics > Bowl Set',
    rating: 4.9,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e0b341?w=600&h=600&fit=crop&q=80',
    colors: [
      { label: 'Cream', value: '#F5F1E8' },
      { label: 'Natural', value: '#E8D4B8' },
    ],
    sizes: [
      { label: 'Small (5")', value: 'small' },
      { label: 'Medium (7")', value: 'medium' },
      { label: 'Large (9")', value: 'large' },
    ],
    description:
      'Hand-thrown ceramic bowls in a set of three. Perfect for salads, pasta, or decorative display. Microwave and dishwasher safe.',
    freeDelivery: true,
  },
  '8': {
    id: '8',
    name: 'Handmade Plate Set',
    price: 72,
    breadcrumb: 'Home > Ceramics > Plate Set',
    rating: 4.9,
    reviewCount: 55,
    image: 'https://images.pexels.com/photos/3407680/pexels-photo-3407680.jpeg?w=600&h=600&fit=crop',
    colors: [
      { label: 'Cream', value: '#F5F1E8' },
      { label: 'Natural', value: '#E8D4B8' },
    ],
    sizes: [
      { label: 'Salad (8")', value: 'salad' },
      { label: 'Dinner (10.5")', value: 'dinner' },
    ],
    description:
      'Handmade ceramic plate set with organic glaze. Artisan-crafted with subtle variations in each plate. Microwave and dishwasher safe.',
    freeDelivery: true,
  },
  '9': {
    id: '9',
    name: 'Cedar Candle',
    price: 32,
    breadcrumb: 'Home > Candles > Cedar Candle',
    rating: 4.9,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop&q=80',
    colors: [
      { label: 'Natural', value: '#E8D4B8' },
      { label: 'Charcoal', value: '#3A3A3A' },
    ],
    sizes: [
      { label: 'Standard (6oz)', value: 'standard' },
      { label: 'Large (10oz)', value: 'large' },
    ],
    description:
      'Soy-based candle with cedarwood and pine scents. Burns for up to 40 hours. Hand-poured in small batches.',
    freeDelivery: true,
  },
  '10': {
    id: '10',
    name: 'Lavender Soy Candle',
    price: 28,
    breadcrumb: 'Home > Candles > Lavender Candle',
    rating: 4.7,
    reviewCount: 98,
    image: 'https://images.pexels.com/photos/3955650/pexels-photo-3955650.jpeg?w=600&h=600&fit=crop',
    colors: [
      { label: 'Lavender', value: '#D4A5D4' },
      { label: 'Natural', value: '#E8D4B8' },
    ],
    sizes: [
      { label: 'Standard (6oz)', value: 'standard' },
      { label: 'Large (10oz)', value: 'large' },
    ],
    description:
      'Soy-based candle infused with pure lavender essential oil. Burns for up to 40 hours. Hand-poured for ultimate relaxation.',
    freeDelivery: true,
  },
  '11': {
    id: '11',
    name: 'Wooden Cutting Board',
    price: 42,
    breadcrumb: 'Tabletop > Boards',
    rating: 4.7,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop&q=80',
    colors: [
      { label: 'Walnut', value: '#6B4423' },
      { label: 'Oak', value: '#A0826D' },
    ],
    sizes: [
      { label: 'Small (12")', value: 'small' },
      { label: 'Large (18")', value: 'large' },
    ],
    description:
      'Sustainably sourced hardwood cutting board. Perfect for food prep or as a charcuterie board. Oil-treated for durability.',
    freeDelivery: true,
  },
  '12': {
    id: '12',
    name: 'Marble Coaster Set',
    price: 28,
    breadcrumb: 'Tabletop > Coasters',
    rating: 4.9,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e0b341?w=600&h=600&fit=crop&q=80',
    colors: [
      { label: 'White', value: '#F5F1E8' },
      { label: 'Black', value: '#2C2C2C' },
    ],
    sizes: [
      { label: 'Set of 4', value: 'four' },
      { label: 'Set of 6', value: 'six' },
    ],
    description:
      'Authentic marble coasters with felt backing. Protects surfaces while adding elegance to any table setting.',
    freeDelivery: true,
  },
  '13': {
    id: '13',
    name: 'Bamboo Utensil Set',
    price: 24,
    breadcrumb: 'Tabletop > Utensils',
    rating: 4.6,
    reviewCount: 134,
    image: 'https://images.unsplash.com/photo-1578207352116-fbce00981b17?w=600&h=600&fit=crop&q=80',
    colors: [
      { label: 'Natural', value: '#D4B896' },
    ],
    sizes: [
      { label: 'Set of 5', value: 'five' },
      { label: 'Set of 10', value: 'ten' },
    ],
    description:
      'Eco-friendly bamboo utensils. Lightweight and durable. Comes with a convenient carrying pouch for travel.',
    freeDelivery: true,
  },
  '14': {
    id: '14',
    name: 'Linen Table Runner',
    price: 45,
    breadcrumb: 'Tabletop > Linens',
    rating: 4.8,
    reviewCount: 76,
    image: 'https://images.pexels.com/photos/5632632/pexels-photo-5632632.jpeg?w=600&h=600&fit=crop',
    colors: [
      { label: 'Sage', value: '#C5D9C0' },
      { label: 'Cream', value: '#F5F1E8' },
      { label: 'Taupe', value: '#D4CCC0' },
    ],
    sizes: [
      { label: 'Standard (16"×72")', value: 'standard' },
      { label: 'Long (16"×108")', value: 'long' },
    ],
    description:
      'Premium linen table runner adds elegance to any dining setting. Easy care and naturally durable.',
    freeDelivery: true,
  },
  '15': {
    id: '15',
    name: 'Glass Vase Trio',
    price: 52,
    breadcrumb: 'Home > Decor > Vases',
    rating: 4.8,
    reviewCount: 76,
    image: 'https://images.pexels.com/photos/3428498/pexels-photo-3428498.jpeg?w=600&h=600&fit=crop',
    colors: [
      { label: 'Clear', value: '#F5F1E8' },
      { label: 'Frosted', value: '#D4CCC0' },
    ],
    sizes: [
      { label: 'Small (4")', value: 'small' },
      { label: 'Medium (6")', value: 'medium' },
      { label: 'Large (8")', value: 'large' },
    ],
    description:
      'Set of three hand-blown glass vases in minimalist design. Perfect for fresh or dried flowers.',
    freeDelivery: true,
  },
  '16': {
    id: '16',
    name: 'Terrazzo Planter',
    price: 38,
    breadcrumb: 'Home > Decor > Planters',
    rating: 4.7,
    reviewCount: 103,
    image: 'https://images.pexels.com/photos/4503269/pexels-photo-4503269.jpeg?w=600&h=600&fit=crop',
    colors: [
      { label: 'Cream', value: '#F5F1E8' },
      { label: 'Black', value: '#2C2C2C' },
    ],
    sizes: [
      { label: '6"', value: 'six' },
      { label: '8"', value: 'eight' },
      { label: '10"', value: 'ten' },
    ],
    description:
      'Modern terrazzo planter with drainage hole. Lightweight and durable ceramic material.',
    freeDelivery: true,
  },
  '17': {
    id: '17',
    name: 'Ceramic Wall Hanging',
    price: 55,
    breadcrumb: 'Home > Decor > Wall Art',
    rating: 4.8,
    reviewCount: 64,
    image: 'https://images.pexels.com/photos/3556070/pexels-photo-3556070.jpeg?w=600&h=600&fit=crop',
    colors: [
      { label: 'Cream', value: '#F5F1E8' },
      { label: 'Natural', value: '#E8D4B8' },
    ],
    sizes: [
      { label: 'Medium (10")', value: 'medium' },
      { label: 'Large (14")', value: 'large' },
    ],
    description:
      'Hand-crafted ceramic wall hanging adds artistic flair to any room. Unique textured design.',
    freeDelivery: true,
  },
  '18': {
    id: '18',
    name: 'Macramé Wall Art',
    price: 48,
    breadcrumb: 'Home > Decor > Wall Art',
    rating: 4.9,
    reviewCount: 91,
    image: 'https://images.pexels.com/photos/4968389/pexels-photo-4968389.jpeg?w=600&h=600&fit=crop',
    colors: [
      { label: 'Natural', value: '#D4B896' },
      { label: 'Cream', value: '#F5F1E8' },
    ],
    sizes: [
      { label: 'Small (18")', value: 'small' },
      { label: 'Medium (24")', value: 'medium' },
      { label: 'Large (36")', value: 'large' },
    ],
    description:
      'Boho-inspired macramé wall hanging handwoven with natural cotton cord. Statement piece for any space.',
    freeDelivery: true,
  },
  '19': {
    id: '19',
    name: 'Natural Soap Gift Set',
    price: 36,
    breadcrumb: 'Beauty > Soaps',
    rating: 4.8,
    reviewCount: 92,
    image: 'https://images.pexels.com/photos/3735659/pexels-photo-3735659.jpeg?w=600&h=600&fit=crop',
    colors: [
      { label: 'Assorted', value: '#E8D4B8' },
    ],
    sizes: [
      { label: 'Set of 3', value: 'three' },
      { label: 'Set of 5', value: 'five' },
    ],
    description:
      'Handmade natural soaps crafted from organic ingredients. No synthetic fragrances or harsh chemicals.',
    freeDelivery: true,
  },
  '20': {
    id: '20',
    name: 'Organic Bath Bombs',
    price: 32,
    breadcrumb: 'Beauty > Bath Products',
    rating: 4.7,
    reviewCount: 87,
    image: 'https://images.pexels.com/photos/3906857/pexels-photo-3906857.jpeg?w=600&h=600&fit=crop',
    colors: [
      { label: 'Assorted', value: '#C5D9C0' },
    ],
    sizes: [
      { label: 'Set of 4', value: 'four' },
      { label: 'Set of 8', value: 'eight' },
    ],
    description:
      'Luxurious fizzy bath bombs made with organic essential oils and natural ingredients for a spa-like experience.',
    freeDelivery: true,
  },
};

export const CATEGORIES = ['All', 'SOFT GOODS', 'CERAMICS', 'CANDLES', 'TABLETOP', 'HOME', 'BEAUTY'];

export function getProductsByCategory(category: string): Product[] {
  if (category === 'All') return PRODUCTS;
  return PRODUCTS.filter((product) => product.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
}
