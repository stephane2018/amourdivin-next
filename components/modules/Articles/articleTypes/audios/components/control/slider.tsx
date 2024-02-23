"use client";
import { Percent, formatDateTime } from "@/core/utils/helpers.utils";
import { Slider } from "@nextui-org/react";

function formatTime(timeInSeconds: number | null): string {
  if (timeInSeconds === null) return "";
  const numberOfMinutes = Math.floor(timeInSeconds / 60);
  const numberOfSeconds = Math.floor(timeInSeconds - numberOfMinutes * 60);
  const minutes = `${numberOfMinutes}`.padStart(2, "0");
  const seconds = `${numberOfSeconds}`.padStart(2, "0");
  return `${minutes}:${seconds}`;
}

type ProgressBarProps = {
  duration: number;
  currentime: number;
  onChange: (value: number) => void;
};

const ProgressBar = ({ onChange, duration, currentime }: ProgressBarProps) => {
  return (
    <div className="flex flex-col mt-3 gap-1">
      <Slider
        aria-label="Music progress"
        color="success"
        size="sm"
        step={0.01}
        maxValue={duration}
        value={currentime}
        defaultValue={0.7}
        onChange={(event) => {
          onChange(parseInt(event.toString()));
        }}
      />
      <div className="flex justify-between">
        <p className="text-small">{formatTime(currentime)}</p>
        <p className="text-small text-foreground/50">{formatTime(duration)}</p>
      </div>
    </div>
  );
};
export default ProgressBar;
