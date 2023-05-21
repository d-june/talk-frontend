import { FC, useEffect, useRef, useState } from "react";
import { PauseCircleFilled, PlayCircleFilled } from "@ant-design/icons";
import { convertCurrentTime } from "../../utils";
// @ts-ignore
import styles from "./MessageAudio.module.scss";
// @ts-ignore
import waveSvg from "../../assets/img/wave.svg";

type MessageAudioProps = {
  audioSrc: string;
};

const MessageAudio: FC<MessageAudioProps> = ({ audioSrc }) => {
  const audioElem = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (audioElem.current) {
      if (!isPlaying) {
        audioElem.current.play();
      } else {
        audioElem.current.pause();
      }
    }
  };

  useEffect(() => {
    if (audioElem.current) {
      audioElem.current.volume = 0.5;
      audioElem.current.addEventListener(
        "playing",
        () => {
          setIsPlaying(true);
        },
        false
      );
      audioElem.current.addEventListener(
        "ended",
        () => {
          setIsPlaying(false);
          setProgress(0);
          setCurrentTime(0);
        },
        false
      );
      audioElem.current.addEventListener(
        "pause",
        () => {
          setIsPlaying(false);
        },
        false
      );
      audioElem.current.addEventListener("timeupdate", () => {
        if (audioElem.current) {
          const duration =
            (audioElem.current && audioElem.current.duration) || 0;
          setCurrentTime(audioElem.current.currentTime);
          setProgress((audioElem.current.currentTime / duration) * 100);
        }
      });
    }
  }, []);

  return (
    <div className={styles.messageAudioBubble}>
      <audio ref={audioElem} src={audioSrc} preload="auto" />
      <div
        className={styles.messageAudioProgress}
        style={{ width: progress + "%" }}
      ></div>
      <div className={styles.messageAudioInfo}>
        <div className={styles.messageAudioBtn}>
          <button onClick={togglePlay}>
            {isPlaying ? <PauseCircleFilled /> : <PlayCircleFilled />}
          </button>
        </div>
        <div className={styles.messageAudioWave}>
          <img src={waveSvg} alt="wave svg" />
        </div>
        <span className={styles.messageAudioDuration}>
          {convertCurrentTime(currentTime)}
        </span>
      </div>
    </div>
  );
};

export default MessageAudio;
