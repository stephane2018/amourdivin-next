"use client";
import { Slider } from "@nextui-org/react";

type ProgressBarProps = {
  progress: number;
  onChange: (value: number) => void;
  leftLabel: string;
  rightLabel: string;
};

const ProgressBar = ({
  progress,
  onChange,
  leftLabel,
  rightLabel,
}: ProgressBarProps) => {
  return (
    <div className="flex flex-col mt-3 gap-1">
      <Slider
        aria-label="Music progress"
        classNames={{
          track: "bg-default-500/30",
          thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
        }}
        color="foreground"
        defaultValue={progress || 0}
        size="sm"
        onChange={(event) => {
          onChange(parseInt(event.toString()));
        }}
      />
      <div className="flex justify-between">
        <p className="text-small">{leftLabel}</p>
        <p className="text-small text-foreground/50">{rightLabel}</p>
      </div>
    </div>
  );
};
export default ProgressBar;
