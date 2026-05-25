export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  popular?: boolean;
  new?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  calories?: number;
  prepTime?: string;
  ingredients?: string[];
  tags?: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  count: number;
}
