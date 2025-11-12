"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from '@/context/ThemeContext';

export default function Cursor() {
  const cursorRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let usingMouse = false;
    let lastTouchTime = 0;

    const enableMouse = () => {
      if (!usingMouse) {
        usingMouse = true;
        document.body.classList.add("has-mouse");
        document.body.classList.remove("no-mouse");
      }
    };

    const disableMouse = () => {
      usingMouse = false;
      document.body.classList.remove("has-mouse");
      document.body.classList.add("no-mouse");
    };

    const moveCursor = (e) => {
      if (Date.now() - lastTouchTime < 500) return;
      enableMouse();
      const cursorSize = cursor.offsetWidth / 2;
      cursor.style.left = `${e.clientX - cursorSize}px`;
      cursor.style.top = `${e.clientY - cursorSize}px`;
    };

    const handleTouchStart = () => {
      lastTouchTime = Date.now();
      disableMouse();
    };

    const handleHover = () => cursor.classList.add("hovered");
    const handleLeave = () => cursor.classList.remove("hovered");

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    document.querySelectorAll("button, a, input, textarea, select").forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    disableMouse();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("touchstart", handleTouchStart);
      document.querySelectorAll("button, a, input, textarea, select").forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return <div className={`custom-cursor theme-${theme}`} ref={cursorRef}></div>;
}