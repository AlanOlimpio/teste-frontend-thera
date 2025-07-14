export interface ProductInterfaceProps {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  imageUrl: string;
  createdAt?: Date;
}
