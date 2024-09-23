import { Product, ShopStore } from '@/types/Types';
import { create } from 'zustand'

interface StoreType {
    shop: ShopStore[]
    setShop: (shop: ShopStore) => void
    alterShop: (shop: ShopStore[]) => void
    clearShop: () => void
    allProducts: Product[]
    setAllProducts: (products: Product[]) => void
}

const useAppStore = create<StoreType>()((set) => ({
    shop: [],
    setShop: (newProduct: ShopStore) => set((state) => ({ shop: [...state.shop, newProduct] })),
    alterShop: (newShop: ShopStore[]) => set(() => ({ shop: newShop })),
    clearShop: () => set(() => ({ shop: [] })),
    allProducts: [],
    setAllProducts: (newProducts: Product[]) => set(() => ({ allProducts: newProducts })),
}))

export default useAppStore;