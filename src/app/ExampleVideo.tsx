"use client";
import React, { useEffect, useState } from "react";

function ExampleVideo({ source }: { source: string }) {
  const [intervalTime, setIntervalTime] = useState(0);
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const getRandomPosition = () => {
      const newX = Math.random() * screenSize.width;
      const newY = Math.random() * screenSize.height;
      const scale = Math.random() * 0.5 + 0.5;
      setPosition({ x: newX, y: newY });
      setScale(scale);
    };

    if (intervalTime == 0) {
      getRandomPosition();
    }

    const new_interval_time = Math.random() * 3000 + 1000;
    setIntervalTime(new_interval_time);
    const timer = setInterval(getRandomPosition, new_interval_time); // Change position every 3 seconds

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  const videoStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: -1,
    width:
      screenSize.width <= screenSize.height
        ? (screenSize.width / 5) * 3
        : undefined,
    height:
      screenSize.width > screenSize.height
        ? (screenSize.height / 5) * 3
        : undefined,
    left: position.x,
    top: position.y,
    transition: `left ${intervalTime}ms ease-in-out, top ${intervalTime}ms ease-in-out, transform ${intervalTime}ms ease-in-out, filter ${intervalTime}ms ease-in-out, opacity ${intervalTime}ms ease-in-out`,
    transform: `translate(-50%, -50%) scale(${scale})`,
    opacity: `${scale}`,
    borderRadius: "24px",
    transformOrigin: "center",
    // blur lerp scale
    filter: `blur(${(1 - scale) * 6}px)`,
  };

  return (
    <video
      src={source}
      style={videoStyle}
      controls={false}
      draggable={false}
      autoPlay
      loop
      muted
      playsInline
    />
  );
}

export default ExampleVideo;
