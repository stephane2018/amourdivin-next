import { database } from "@/core/config/AppwriteConfig";
import { ICategories } from "@/core/interfaces/categories";
import CategorieServices from "@/core/services/categories.service";
import { useQuery } from "@tanstack/react-query";

export function useGetCategoriesParent() {
  return useQuery({
    queryKey: ["categories/parent"],
    queryFn: async () => CategorieServices.getCategoriesParents(),
  });
}
