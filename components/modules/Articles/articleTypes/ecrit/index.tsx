import React from "react";

const MakDownContentText = ({ content }: { content: string }) => {
  return (
    <div
      className="md:px-5 text-left flex-wrap   md:w-full "
      dangerouslySetInnerHTML={{
        __html: content.replace(/\n/g, "<br />"),
      }}
    />
  );
};

export default MakDownContentText;
