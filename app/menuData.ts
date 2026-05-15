export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "breakfast" | "rice" | "soups" | "sides" | "drinks";
  imageUrl: string;
  popular?: boolean;
}

export const menuItems: MenuItem[] = [
  // Breakfast
  {
    id: "bread-egg",
    name: "Bread & Egg",
    description: "Soft bread with golden fried egg. Simple, filling, and always hits the spot.",
    price: 600,
    category: "breakfast",
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop",
    popular: true,
  },
  {
    id: "bread-akara",
    name: "Bread & Akara",
    description: "Crispy bean cakes with fresh bread. A classic Nigerian breakfast combo.",
    price: 700,
    category: "breakfast",
    imageUrl: "https://images.unsplash.com/photo-1608039829572-fa085600ff38?w=600&h=400&fit=crop",
  },
  {
    id: "pancakes",
    name: "Pancakes",
    description: "Fluffy golden pancakes served with honey or syrup. Sweet start to your day.",
    price: 800,
    category: "breakfast",
    imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop",
  },

  // Rice
  {
    id: "jollof-rice",
    name: "Jollof Rice",
    description: "Freshly made, perfectly spiced. The classic Nigerian party rice with plantain.",
    price: 800,
    category: "rice",
    imageUrl: "https://images.unsplash.com/photo-1630752708689-02c8636b3ee7?w=600&h=400&fit=crop",
    popular: true,
  },
  {
    id: "fried-rice",
    name: "Fried Rice",
    description: "Perfectly seasoned with mixed vegetables. Colorful, fragrant, satisfying.",
    price: 900,
    category: "rice",
    imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop",
  },
  {
    id: "rice-beans",
    name: "Rice & Beans",
    description: "Hearty combo with stew and plantain. Protein-packed and filling.",
    price: 1000,
    category: "rice",
    imageUrl: "https://images.unsplash.com/photo-1596803244618-8dbee441d70b?w=600&h=400&fit=crop",
  },

  // Soups
  {
    id: "pepper-soup",
    name: "Pepper Soup",
    description: "Rich, spicy broth with tender meat. Perfect comfort food for any time.",
    price: 1200,
    category: "soups",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
    popular: true,
  },
  {
    id: "egusi-soup",
    name: "Egusi Soup",
    description: "Creamy melon seed soup with leafy greens. Served with your choice of swallow.",
    price: 1500,
    category: "soups",
    imageUrl: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600&h=400&fit=crop",
  },
  {
    id: "ogbono-soup",
    name: "Ogbono Soup",
    description: "Thick, draw soup made from wild mango seeds. Rich and deeply satisfying.",
    price: 1500,
    category: "soups",
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&h=400&fit=crop",
  },

  // Sides
  {
    id: "plantain",
    name: "Fried Plantain",
    description: "Sweet ripe plantain fried to golden perfection. The perfect side to any meal.",
    price: 400,
    category: "sides",
    imageUrl: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=600&h=400&fit=crop",
  },
  {
    id: "moimoi",
    name: "Moi Moi",
    description: "Steamed bean pudding — soft, savory, and packed with flavor.",
    price: 500,
    category: "sides",
    imageUrl: "https://images.unsplash.com/photo-1608039829572-fa085600ff38?w=600&h=400&fit=crop",
  },

  // Drinks
  {
    id: "zobo",
    name: "Zobo Drink",
    description: "Refreshing hibiscus drink with a hint of ginger. Served chilled.",
    price: 400,
    category: "drinks",
    imageUrl: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop",
  },
  {
    id: "soft-drinks",
    name: "Soft Drinks",
    description: "Assorted sodas and bottled drinks. Coke, Fanta, Sprite, and more.",
    price: 300,
    category: "drinks",
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&h=400&fit=crop",
  },
];

export const categories = [
  { id: "all", label: "All" },
  { id: "breakfast", label: "Breakfast" },
  { id: "rice", label: "Rice" },
  { id: "soups", label: "Soups" },
  { id: "sides", label: "Sides" },
  { id: "drinks", label: "Drinks" },
];