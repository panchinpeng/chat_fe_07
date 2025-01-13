import { useRef, useState, useEffect } from "react";
export default function useIntersectionObserver() {
  const observer = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    return () => {
      observer.current && observer.current.disconnect();
    };
  }, []);
  return {
    startObserve: (currentDOM) => {
      if (observer.current) {
        observer.current.disconnect();
        // throw new Error("IntersectionObserver multiple");
      }
      observer.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setIsIntersecting(entry.isIntersecting);
        },
        {
          root: document.getElementById("interactionWrap"),
          rootMargin: "0px 0px 100px 0px",
        }
      );
      observer.current.observe(currentDOM);
    },
    isIntersecting,
  };
}
