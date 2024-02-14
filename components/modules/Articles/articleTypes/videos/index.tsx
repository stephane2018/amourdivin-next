import React from "react";
import { YouTubeEmbed } from "@next/third-parties/google";
import classNames from "classnames";

const Videos = ({ youtubeUrl }: { youtubeUrl: string }) => {
  const url = youtubeUrl.split("/").at(4);
  return (
    <div className="gap-3 rounded-xl felx mx-auto">
      <YouTubeEmbed
        width={600}
        videoid={url || ""}
        height={400}
        params="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};

export default Videos;
