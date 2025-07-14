import { create } from "zustand";

import { api } from "@/lib/axios";
import { ProductInterfaceProps } from "@/interfaces/product";

interface ProductStore {
  productList: ProductInterfaceProps[];
  total: number;
  fetchProducts: (params?: Record<string, string>) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  productList: [],
  total: 0,
  fetchProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const { data } = await api.get(`/api/products?${query}`);
    set({ productList: data.products, total: data.total });
  },
}));
