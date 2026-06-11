import { useEffect, useRef, useState } from "react";
import style from "./visibilityCheck.module.css";

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const el = entry.target;
            const callback = el._onVisible;

            const rect = el.getBoundingClientRect();
            const distanceFromViewport = Math.min(
                Math.abs(rect.top),
                Math.abs(window.innerHeight - rect.bottom)
            );

            const isFarAway = distanceFromViewport > 15000; // 可自行調整為 10000
            const isVisible = !isFarAway && entry.isIntersecting;

            if (callback) {
                callback(isVisible);
            }
        });
    },
    {
        root: null,
        rootMargin: "0px",
        threshold: 0,
    }
);

export default function VisibilityCheck({ children }) {
    const wrapperRef = useRef();
    const contentRef = useRef();
    const [visible, setVisible] = useState(true);
    const [height, setHeight] = useState(null);
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        el._onVisible = setVisible;
        observer.observe(el);
        return () => {
            observer.unobserve(el);
            delete el._onVisible;
        };
    }, []);

    useEffect(() => {
        if (visible && contentRef.current) {
            const contentEl = contentRef.current;

            const update = () => {
                setHeight(contentEl.offsetHeight);

                // 等待圖片完全載入，延遲觸發動畫
                setTimeout(() => {
                    setShowAnimation(true);
                }, 1000);
            };

            update(); // 初次進入畫面立即更新

            const imgs = contentEl.querySelectorAll("img");
            imgs.forEach((img) => {
                if (!img.complete) {
                    img.addEventListener("load", update);
                }
            });

            return () => {
                imgs.forEach((img) => {
                    img.removeEventListener("load", update);
                });
            };
        }
    }, [visible]);

    return (
        <div
            ref={wrapperRef}
            style={{
                minHeight: height || undefined,
                // transition: "opacity 0.3s ease",
                marginBottom: "12px", // ✅ 增加間距
            }}
            className={style.messageWrapper}
        >
            <div
                ref={contentRef}
                style={{
                    opacity: showAnimation && visible ? 1 : 0,
                    visibility: showAnimation && visible ? "visible" : "hidden", // ✅ 重點補丁
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
            >
                {children}
            </div>
            {/* {visible ? (
                <div
                    ref={contentRef}
                    style={{
                        opacity: showAnimation ? 1 : 0,
                        visibility: showAnimation ? "visible" : "hidden", // ✅ 重點補丁
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                >
                    {children}
                </div>
            ) : (
                <div
                    style={{
                        height: height ?? 60,
                        background: "rgba(230,230,230,0.3)",
                        borderRadius: "8px",
                        marginBottom: "12px", // ✅ 占位也加 margin
                        animation: "pulse 1.5s infinite",
                    }}
                />
            )} */}
        </div>
    );
}
