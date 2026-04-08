export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
  name?: string;
  avatar?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'ai_tools' | 'courses' | 'apk';
  image_url?: string;
  file_url?: string;
  telegram_group_link?: string;
  verified: boolean;
  created_at: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail_url?: string;
  referral_link: string;
  category: string;
  verified: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  product_id?: string;
  game_id?: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  payment_method: 'razorpay' | 'manual';
  payment_screenshot?: string;
  utr_number?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  created_at: string;
  user?: User;
  product?: Product;
  game?: Game;
}

export interface Settings {
  id: string;
  payment_mode: 'manual' | 'automatic';
  active_gateway: 'razorpay';
  razorpay_key?: string;
  razorpay_secret?: string;
  upi_id: string;
  telegram_support: string;
  telegram_group_link?: string;
  maintenance_mode: boolean;
}

export interface CollaborationRequest {
  id: string;
  name: string;
  email: string;
  message?: string;
  created_at: string;
}

export interface UserPurchase {
  id: string;
  user_id: string;
  product_id?: string;
  game_id?: string;
  order_id: string;
  created_at: string;
}