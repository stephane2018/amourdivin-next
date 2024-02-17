"use client";
import { Button } from "@nextui-org/button";
import { RepeatOneIcon } from "../icones/RepeatOneIcon";
import { PreviousIcon } from "../icones/PreviousIcon";
import { NextIcon } from "../icones/NextIcon";
import { PauseCircleIcon, PlayCircleIcon, PlayIcon } from "lucide-react";
import { ShuffleIcon } from "../icones/ShuffleIcon";

type ControlsProps = {
  onPlayClick: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  onRepeatClick: () => void;
  onShuffleClick: () => void;
  isPlaying: boolean;
  repeat: boolean;
  shuffle: boolean;
};

const Control = ({
  onPlayClick,
  isPlaying,
  onPrevClick,
  onNextClick,
  repeat,
  onRepeatClick,
  shuffle,
  onShuffleClick,
}: ControlsProps) => {
  return (
    <div className="flex w-full items-center justify-center">
      <Button
        isIconOnly
        className="data-[hover]:bg-foreground/10"
        radius="full"
        variant="light"
        onClick={onRepeatClick}
      >
        <RepeatOneIcon className="text-foreground/80" />
      </Button>
      <Button
        isIconOnly
        className="data-[hover]:bg-foreground/10"
        radius="full"
        variant="light"
        onClick={onPrevClick}
      >
        <PreviousIcon />
      </Button>
      <Button
        isIconOnly
        className="w-auto h-auto data-[hover]:bg-foreground/10"
        radius="full"
        variant="light"
        onClick={onPlayClick}
      >
        {isPlaying ? (
          <PauseCircleIcon size={54} />
        ) : (
          <PlayCircleIcon size={54} />
        )}
      </Button>
      <Button
        isIconOnly
        className="data-[hover]:bg-foreground/10"
        radius="full"
        variant="light"
        onClick={onNextClick}
      >
        <NextIcon />
      </Button>
      <Button
        isIconOnly
        className="data-[hover]:bg-foreground/10"
        radius="full"
        variant="light"
        onClick={onShuffleClick}
      >
        <ShuffleIcon
          className={shuffle ? "[&>path]:stroke-transparent" : ""}
          fill={shuffle ? "currentColor" : "none"}
        />
      </Button>
    </div>
  );
};
export default Control;
