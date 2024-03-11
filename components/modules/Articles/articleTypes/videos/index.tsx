import React from "react";
import { YouTubeEmbed } from "@next/third-parties/google";
import classNames from "classnames";
import { EnumPosteType } from "@/core/enum";

const Videos = ({ youtubeUrl, type }: { youtubeUrl: string; type: string }) => {
  const url = youtubeUrl?.split("/").at(4);
  return type === EnumPosteType.VIDEOS ? (
    <div className="gap-3 rounded-xl flex w-full flex-wrap flex-grow-0 mx-auto">
      <YouTubeEmbed
        width={600}
        videoid={url || ""}
        height={400}
        params="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  ) : null;
};

export default Videos;
