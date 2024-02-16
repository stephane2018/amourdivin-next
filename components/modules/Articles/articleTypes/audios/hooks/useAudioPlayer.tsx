import { useCallback, useEffect, useState } from "react";

interface AudioProps {
  src: string;
  autoPlaySong: boolean;
}

interface HTMLAudioState extends AudioProps {
  currentTime: number;
  duration: number;
  paused: boolean;
  waiting: boolean;
}

const useAudioPlayer = ({ src, autoPlaySong = false }: AudioProps) => {
  console.log(src);
  // The Audio element lives in state
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [autoPlay, setautoPlay] = useState<boolean>(autoPlaySong);
  const [state, setState] = useState<HTMLAudioState>({
    currentTime: 0,
    duration: 0,
    paused: true,
    waiting: false,
    src: "",
    autoPlaySong: false,
  });

  const setPlayer = (
    partialState: Partial<HTMLAudioState>,
    replace = false
  ) => {
    if (replace) {
      setState(partialState as HTMLAudioState);
    } else {
      setState((prevState) => ({ ...prevState, ...partialState }));
    }
  };

  const handleLoadData = useCallback(() => {
    if (audio) {
      setPlayer({ duration: audio.duration, currentTime: audio.currentTime });
    }
  }, [audio]);
  const handleTimeUpdate = useCallback(() => {
    if (audio) {
      setPlayer({ currentTime: audio.currentTime });
    }
  }, [audio]);
  const handleEnded = useCallback(() => {
    if (audio) {
      setPlayer({ currentTime: 0, paused: true });
    }
  }, [audio]);
  const handlePlay = useCallback(() => {
    if (audio) {
      setPlayer({ paused: false });
    }
  }, [audio]);
  const handlePause = useCallback(() => {
    if (audio) {
      setPlayer({ paused: true });
    }
  }, [audio]);

  let lockPlay = false;

  // Player controls
  const controls = {
    play: () => {
      if (!lockPlay) {
        const promise = audio?.play();
        const isPromise = typeof promise === "object";
        if (isPromise) {
          lockPlay = true;
          const resetLock = () => {
            lockPlay = false;
          };
          promise?.then(resetLock, resetLock);
        }
        return promise;
      }
      return undefined;
    },
    pause: () => {
      if (audio) {
        audio.pause();
      }
    },
    seek: (time: number) => {
      if (audio) {
        audio.currentTime = time;
      }
    },
    setCurrentaudio: (audio: string, autoPlay: boolean) => {
      const newAudio = new Audio(audio);
      newAudio.load();
      setAudio(newAudio);
      if (audio) {
        controls.play();
      }
    },
    isPlaying: () => !!(audio && audio.duration > 0 && !audio.paused),
    isStop: () => !!(audio && audio.paused),
  };

  // Create a new Audio element and put it in state
  useEffect(() => {
    const newAudio = new Audio(state.src);
    newAudio.load();
    setAudio(newAudio);
  }, [src, state.src]);

  // Once the new Audio element is loaded, set up and add handlers
  useEffect(() => {
    // console.log("add event listeners");
    if (audio) {
      audio.addEventListener("loadeddata", handleLoadData);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
    }
    return function cleanup() {
      // Audio element has to be paused in order to be garbage
      // collected
      audio?.pause();
      audio?.removeEventListener("loadeddata", handleLoadData);
      audio?.removeEventListener("timeupdate", handleTimeUpdate);
      audio?.removeEventListener("ended", handleEnded);
      audio?.removeEventListener("play", handlePlay);
      audio?.removeEventListener("pause", handlePause);
    };
  }, [
    audio,
    handleEnded,
    handleLoadData,
    handlePause,
    handlePlay,
    handleTimeUpdate,
  ]);

  return { state, controls, setPlayer, audio };
};

export default useAudioPlayer;
