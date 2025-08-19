import { useState, useEffect, useRef } from "react";
import style from "./soundPlay.module.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";

function SoundPlay({ message }) {
    const [play, setPlay] = useState(false);
    const [bars, setBars] = useState(10);
    const containerRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth - 30;
                const barTotalWidth = 6; // span 寬度 + 間距
                const count = Math.floor(width / barTotalWidth);
                if (count !== bars) {
                    setBars(count);
                }
                console.log("runrun");
            }
        });
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        const onEnded = () => setPlay(false);
        audioRef.current.addEventListener("ended", onEnded);
        return () => {
            audioRef.current &&
                audioRef.current.removeEventListener("ended", onEnded);
        };
    }, []);

    useEffect(() => {
        if (play) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [play]);

    return (
        <div className={style.audioWrap}>
            <div
                ref={containerRef}
                className={`${style.voiceWave} ${play ? style.play : ""}`}
            >
                {Array.from({ length: bars }).map((_, i) => {
                    const randomHeight = 40 + Math.random() * 40; // 高度 30~60%
                    const delay = (i % 10) * 0.1 + Math.random() * 0.2; // 0~0.2s 隨機動畫延遲
                    return (
                        <span
                            key={i}
                            style={{
                                animationDelay: `${delay}s`,
                            }}
                        />
                    );
                })}
            </div>
            <div
                className={style.playBtn}
                onClick={() => {
                    setPlay((p) => !p);
                }}
            >
                {play ? (
                    <PauseCircleFilledIcon sx={{ fontSize: "28px" }} />
                ) : (
                    <PlayCircleIcon sx={{ fontSize: "28px" }} />
                )}
            </div>
            <audio
                ref={audioRef}
                src={`${process.env.REACT_APP_API_DOMAIN}/api/message/getImage?path=${message.path}`}
            ></audio>
        </div>
    );
}

export default SoundPlay;
