import { ListTodo } from "lucide-react";
import { FC, ReactNode } from "react";

interface CategoriesHeaderProps {
  title?: string;
  icon?: ReactNode;
  hideIcon?: boolean;
}

const CategoriesHeader: FC<CategoriesHeaderProps> = ({
  icon,
  title,
  hideIcon = true,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-3 items-center">
        {icon ? icon : hideIcon ? <ListTodo size={20} /> : null}
        <div className="flex flex-col">
          <h1 className="text-xl w-fit flex gap-1  ">
            <span className="font-bold text-black-600/20">
              {title || "Categories"}
            </span>
          </h1>
          <span className="h-[2px] mt-1 w-[40%] bg-primary-500 dark:bg-primary-700 text-transparent ">
            ..
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoriesHeader;
