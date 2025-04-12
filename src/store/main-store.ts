import { CATEGORY, PRODUCT, SERVICE } from "@/utils/types";
import { create } from 'zustand';

interface MAIN_STORE {
    categories: CATEGORY[],
    topProducts: PRODUCT[],
    topServices: SERVICE[],
    setCategories: (categories: CATEGORY[]) => void,
    updateCategory: (category: CATEGORY) => void,
    setTopProducts: (products: PRODUCT[]) => void,
    setTopServices: (services: SERVICE[]) => void
}

const useMainStore = create<MAIN_STORE>((set) => {
    return {
        categories: [],
        topProducts: [],
        topServices: [],
        setCategories: (categories: CATEGORY[]) => set({ categories }),
        updateCategory: (category: CATEGORY) => set((state) => {
            const currentCategories = state.categories
            const foundCategoryIndex = currentCategories.findIndex(each => each._id === category._id);
            if (foundCategoryIndex !== -1) {
                currentCategories[foundCategoryIndex] = category;
                return { categories: [...currentCategories] }
            }
            return { categories: [...state.categories, category] }
        }),
        setTopProducts: (products: PRODUCT[]) => set({ topProducts: products }),
        setTopServices: (services: SERVICE[]) => set({ topServices: services })
    }
})

export default useMainStore;