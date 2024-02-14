import React from "react";

const MakDownContentText = ({ content }: { content: string }) => {
  return (
    <div
      className="px-5 text-left"
      dangerouslySetInnerHTML={{
        __html: content.replace(/\n/g, "<br />"),
      }}
    />
  );
};

export default MakDownContentText;
