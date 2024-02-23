"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Image,
  Button,
  Slider,
  CardFooter,
  Divider,
  CircularProgress,
} from "@nextui-org/react";
import { HeartIcon } from "./components/icones/HeartIcon";
import { IPostsModels } from "@/core/interfaces/posts";
import { GetAudioPlayList } from "@/hooks/useAudio";
import Control from "./components/control/control";
import ProgressBar from "./components/control/slider";
import {
  Percent,
  disPlayImageForFrontUrl,
  formatDate,
} from "@/core/utils/helpers.utils";
import { TrackMetadata } from "@/hooks/commom/audioPlayer/types";
import useAudioPlayer from "./hooks/useAudioPlayer";
import { CameraIcon, HardDriveDownload } from "lucide-react";
import classNames from "classnames";
import downloadFile, { handleDownloadFile } from "@/core/utils/doanloadFile";

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
  const [showPlaylist, setShowPlayList] = useState(false);
  const [currentFileDownload, setCurrentFileDownload] = useState("");
  const { AudioPlayList, isLoading, error } = GetAudioPlayList(
    article.id.toString()
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [songIndex, setSongIndex] = useState<number>(0);
  const [replay, setreplay] = useState<boolean>(true);
  const [isRandom, setIsRandom] = useState(false);
  const { audio, state, controls, setPlayer } = useAudioPlayer({
    src: AudioPlayList[songIndex]?.audio_path,
    autoPlaySong: true,
  });
  const currentPercentage = Percent(state.currentTime, state.duration);

  const [buttonState, setButtonState] = useState<boolean>(false);
  const skipRandom = (idx: number) => {
    const randIdx = Math.floor(Math.random() * AudioPlayList.length);
    if (randIdx === idx) {
      skipRandom(idx);
    } else {
      setSongIndex(randIdx);
      setPlayer({
        src: AudioPlayList[randIdx]?.audio_path,
        autoPlaySong: true,
      });
    }
  };

  /** *
   * Gestion des telechargerment
   * ************ fin *****************
   * ************************************
   */

  /** *
   * Gestion du lesteur audio
   * ************ Debut *****************
   * ************************************
   */

  // Faire jouer l'audio currnet
  const play = useCallback(() => {
    if (audio?.currentSrc === "") {
      setPlayer({
        src: AudioPlayList[songIndex]?.audio_path,
        autoPlaySong: true,
      });
      audio?.load();
      controls.play();
    } else {
      audio?.play();
      controls.play();
    }
  }, [audio, controls, songIndex, setPlayer, AudioPlayList]);

  function pause() {
    controls.pause();
    audio?.pause();
  }

  function togglePlayPause() {
    if (audio?.paused) {
      audio?.play();
      setIsPlaying(true);
    } else {
      audio?.pause();
      setIsPlaying(false);
    }
  }
  function activeRandom() {
    if (localStorage.getItem("isRandom") !== null) {
      setIsRandom(!isRandom);
      localStorage.setItem("isRandom", JSON.stringify("0"));
      // toast.success("mode aleatoire activé", {
      //   position: "bottom-right",
      // });
    } else {
      setIsRandom(!isRandom);
      localStorage.setItem("isRandom", JSON.stringify("1"));
      // toast.success("mode aleatoire activé", {
      //   position: "bottom-right",
      // });
    }
  }
  function replayAudio() {
    if (localStorage.getItem("replay") !== null) {
      setreplay(!replay);
      localStorage.setItem("replay", JSON.stringify("1"));
      // toast.success("lecture en boubles active", {
      //   position: "bottom-right",
      // });
    } else {
      setreplay(!replay);
      localStorage.setItem("replay", JSON.stringify("1"));
      // toast.success("lecture en boubles active", {
      //   position: "bottom-right",
      // });
    }
  }

  const nextTrack = () => {
    if (isRandom) return skipRandom(songIndex);
    if (songIndex === AudioPlayList.length - 1) {
      setSongIndex(0);
      setPlayer({
        src: AudioPlayList[songIndex]?.audio_path,
        autoPlaySong: true,
      });
    } else {
      setSongIndex(songIndex + 1);
      setPlayer({
        src: AudioPlayList[songIndex]?.audio_path,
        autoPlaySong: true,
      });
    }
    play();
    return 0;
  };
  const PrevTrack = () => {
    if (songIndex === 0) {
      setSongIndex(AudioPlayList.length - 1);
      setPlayer({
        src: AudioPlayList[songIndex]?.audio_path,
        autoPlaySong: true,
      });
    } else {
      setSongIndex(songIndex - 1);
      setPlayer({
        src: AudioPlayList[songIndex]?.audio_path,
        autoPlaySong: true,
      });
    }
  };

  const onScrub = (value: any) => {
    // Clear any timers already running
    controls.seek(value);
    controls.play();
  };

  const onScrubEnd = () => {
    // If not already playing, start
    controls.play();
  };
  const checkIsRandom = useCallback(() => {
    if (localStorage.getItem("isRandom") !== null) {
      // console.log(0);
      setIsRandom(true);
    } else {
      setIsRandom(false);
    }
  }, []);

  const AudioListener = useCallback(() => {
    if (audio?.currentSrc === "") {
      setSongIndex(0);
      setPlayer({
        src: AudioPlayList[songIndex]?.audio_path,
        autoPlaySong: true,
      });
      audio?.load();
    }
    audio?.addEventListener("play", play);
    audio?.addEventListener("ended", function () {
      if (replay === true) {
        setPlayer({
          src: AudioPlayList[songIndex]?.audio_path,
          autoPlaySong: true,
        });
        controls.play();
      } else {
        setSongIndex(songIndex + 1);
        setPlayer({
          src: AudioPlayList[songIndex]?.audio_path,
          autoPlaySong: true,
        });
        controls.play();
      }
    });
  }, [audio, controls, replay, play, setPlayer, songIndex, AudioPlayList]);

  const auToPlayMusic = useCallback(() => {
    if (audio?.currentSrc === "") {
      setPlayer({
        src: AudioPlayList[songIndex]?.audio_path,
        autoPlaySong: true,
      });
      audio?.load();
      controls.play();
    }
  }, [audio, controls, AudioPlayList, setPlayer, songIndex]);

  useEffect(() => {
    auToPlayMusic();

    return () => {};
  }, [AudioPlayList, checkIsRandom, AudioListener, auToPlayMusic]);

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
              className="object-cover !h-[200px]"
              height={50}
              shadow="md"
              src={`${disPlayImageForFrontUrl(article?.image_default || "")}`}
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">
                  {AudioPlayList[songIndex]?.audio_name}
                </h3>
                <p className="text-small text-foreground/80">
                  {songIndex + 1}/{AudioPlayList.length} audios
                </p>
                <h1 className="text-large font-medium mt-2">
                  {formatDate(AudioPlayList[songIndex]?.$createdAt.toString())}
                </h1>
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
                rightLabel={formatTime(state.duration)}
                leftLabel={formatTime(state.currentTime)}
                onChange={onScrub}
                progress={Number(currentPercentage)}
              />
            </div>

            <Control
              shuffle={isRandom}
              repeat={replay}
              onShuffleClick={activeRandom}
              onRepeatClick={replayAudio}
              onPrevClick={PrevTrack}
              onNextClick={nextTrack}
              onPlayClick={togglePlayPause}
              isPlaying={isPlaying}
            />
          </div>
        </div>
      </CardBody>
      <Divider className="my-4" />
      <CardFooter className="flex flex-col">
        <div
          className={` ${
            showPlaylist ? "h-fit" : "h-0"
          } w-full overflow-x-auto transition-transform duration-300`}
        >
          <ol className="list-decimal w-full   gap-4">
            {AudioPlayList.map((item, key) => (
              <li
                key={item.$id}
                className={`
                ${
                  AudioPlayList[songIndex].$id === item.$id
                    ? "bg-green-500/70  "
                    : "dark:bg-black/60"
                }
                flex  items-center w-full  p-2  my-2 rounded-xl justify-between
              `}
              >
                <span className="cursor-pointer hover:underline hover:text-primary-500 transition-colors duration-300">
                  {item.audio_name}
                </span>
                <Button
                  isIconOnly
                  color="warning"
                  variant="faded"
                  aria-label="Take a photo"
                  onClick={() => {
                    setCurrentFileDownload(item.$id);
                    handleDownloadFile({
                      url: item.audio_path,
                      fileName: item.audio_name,
                    })
                      .then(() => setCurrentFileDownload(""))
                      .catch(() => setCurrentFileDownload(""));
                  }}
                >
                  {currentFileDownload == item.$id ? (
                    <CircularProgress size="sm" color="success" />
                  ) : (
                    <HardDriveDownload />
                  )}
                </Button>
              </li>
            ))}
          </ol>
        </div>
        <Button
          color="success"
          className="w-full mt-3 items-center"
          variant="flat"
          onClick={() => setShowPlayList(!showPlaylist)}
        >
          {showPlaylist
            ? "fermer la playlist "
            : `afficher tous les audios (${AudioPlayList.length || ""})`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Audios;
