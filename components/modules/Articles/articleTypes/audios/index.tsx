"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import { HeartIcon } from "./components/icones/HeartIcon";
import { IPostsModels } from "@/core/interfaces/posts";
import { GetAudioPlayList } from "@/hooks/useAudio";
import Control from "./components/control/control";
import useAudioPlayer from "@/hooks/commom/audioPlayer/hooks";
import ProgressBar from "./components/control/slider";
import { disPlayImageForFrontUrl } from "@/core/utils/helpers.utils";
import { TrackMetadata } from "@/hooks/commom/audioPlayer/types";

function formatTime(timeInSeconds: number | null): string {
  if (timeInSeconds === null) return "";
  const numberOfMinutes = Math.floor(timeInSeconds / 60);
  const numberOfSeconds = Math.floor(timeInSeconds - numberOfMinutes * 60);
  const minutes = `${numberOfMinutes}`.padStart(2, "0");
  const seconds = `${numberOfSeconds}`.padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// async function getAudiosData() {}
const Audios = ({ article }: { article: IPostsModels }) => {
  const [liked, setLiked] = useState(false);
  const { AudioPlayList, isLoading, error } = GetAudioPlayList(
    article.id.toString()
  );
  console.log(AudioPlayList);
  const metadataForAudio: TrackMetadata[] = [];
  (AudioPlayList || []).map((item) =>
    metadataForAudio.push({
      audioSrc: item.audio_path,
      name: item.audio_name,
    })
  );
  const {
    playNextTrack,
    playPreviousTrack,
    playerState,
    togglePlayPause,
    toggleRepeat,
    toggleShuffle,
    setPlaybackPosition,
  } = useAudioPlayer({
    coverArtSrc: disPlayImageForFrontUrl(article?.image_default || ""),
    playlist: metadataForAudio,
  });

  const {
    repeat,
    playbackState,
    shuffle,
    currentTrackDuration,
    currentTrackPlaybackPosition,
    currentTrackMetadata,
  } = playerState;

  function setProgress(value: number) {
    if (currentTrackDuration !== null) {
      setPlaybackPosition((value / 100) * currentTrackDuration);
    }
  }

  function computeProgress(): number {
    const noProgress =
      currentTrackDuration === null ||
      currentTrackPlaybackPosition === null ||
      currentTrackDuration === 0;
    if (noProgress) {
      return 0;
    } else {
      return (currentTrackPlaybackPosition / currentTrackDuration) * 100;
    }
  }

  useEffect(() => {}, [playerState]);

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-full py-3"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={200}
              shadow="md"
              src="/images/album-cover.png"
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">Daily Mix</h3>
                <p className="text-small text-foreground/80">12 Tracks</p>
                <h1 className="text-large font-medium mt-2">Frontend Radio</h1>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <ProgressBar
                rightLabel={formatTime(currentTrackDuration)}
                leftLabel={formatTime(currentTrackPlaybackPosition)}
                onChange={setProgress}
                progress={computeProgress()}
              />
            </div>

            <Control
              shuffle={shuffle}
              repeat={repeat}
              onShuffleClick={toggleShuffle}
              onRepeatClick={toggleRepeat}
              onPrevClick={playPreviousTrack}
              onNextClick={playNextTrack}
              onPlayClick={togglePlayPause}
              isPlaying={playbackState === "PLAYING"}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Audios;
