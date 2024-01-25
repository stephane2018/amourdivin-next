import { PostsModels } from "@/core/interfaces/posts";
import CategorieServices from "@/core/services/categories.service";
import userService from "@/core/services/user.service";
import { disPlayImageUrl } from "@/core/utils/helpers.utils";
import { useGetUserById } from "@/hooks/useUser";
import { Button, Image } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Eye, MessageCircle } from "lucide-react";

async function getFeatured(userId: string, posteId: string) {
  console.log(posteId);
  let isLoading = true;
  const userInfo = await userService.GetUserById(userId);
  const categories = await CategorieServices.getCategoriesParentBaseOnChild(
    posteId
  );
  console.log(categories);
  return {
    data: {
      userInfo: userInfo[0],
      categories: categories,
    },
    isLoading: isLoading,
  };
}

interface FeaturedProps {
  poste: PostsModels;
}

const FeatureUserInfos = async ({ poste }: FeaturedProps) => {
  const {
    data: { userInfo, categories },
    isLoading,
  } = await getFeatured(poste.user_id || "", poste.category_id);

  return (
    <div className="flex flex-grow">
      <div className="flex flex-grow gap-2  items-center">
        <Image
          alt="Breathing app icon"
          className="rounded-full w-10 h-10 bg-black"
          src={disPlayImageUrl(userInfo.avatar || "")}
        />
        <div className="flex flex-col gap-1">
          <p className="text-tiny text-white/60">{userInfo.username || ""}</p>
          <div className="justify-between">
            <div className=" flex text-xs font-semibold">
              <span className="mt-0 inline-flex items-center leading-none text-gray-400">
                <MessageCircle className="mr-1 h-3 w-3" />
                {0}
              </span>

              <span className="ml-2   mt-0 inline-flex items-center  leading-none  text-gray-400">
                <Eye className="mr-1 h-3 w-3" />
                {poste.pageviews}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Button radius="full" size="sm">
        Get App
      </Button>
    </div>
  );
};
export default FeatureUserInfos;
