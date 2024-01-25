import { TypeOfMedia } from "@/core/enum";
import { Youtube, FileText, AudioLines } from "lucide-react";
import { FC } from "react";

interface IconHandlerProps {
  icon?: string;
  type: TypeOfMedia;
  className: string;
}

const IconHandler: FC<IconHandlerProps> = ({
  type = TypeOfMedia.Other,
  icon,
  className,
}) => {
  return type === TypeOfMedia.Audio ? (
    <AudioLines className={`${className}`} />
  ) : type === TypeOfMedia.Video ? (
    <Youtube className={`${className}`} />
  ) : type === TypeOfMedia.Ecrit ? (
    <FileText className={` ${className}`} />
  ) : type === TypeOfMedia.Musics ? (
    <AudioLines className={` ${className}`} />
  ) : null;
};

export default IconHandler;
