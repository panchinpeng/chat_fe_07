import { useState } from "react";
import style from "./soundPlay.module.css";
function SoundPlay() {
  const [play, setPlay] = useState(false);
  return (
    <>
      <div className={`${style.voiceWave} ${play ? style.play : ""}`}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={style.playBtn} onClick={() => setPlay((p) => !p)}>
        play
      </div>
    </>
  );
}
export default SoundPlay;
