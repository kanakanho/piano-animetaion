import { useEffect, useState, useRef } from "react";
import Star from "./Star";
import { SvgImage } from "../type/SvgImage";

const Pointer = () => {
  // マウスの座標
  const [svgImages, setSvgImages] = useState<SvgImage[]>([]);
  const lastMousePosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // svgImagesが10個以上になったら古いものから削除
    if (svgImages.length > 6) {
      setSvgImages((prev) => prev.slice(1));
    }
  }, [svgImages]);

  useEffect(() => {
    const mouseMoveListener = (event: MouseEvent) => {
      const currentMousePosition = { x: event.clientX, y: event.clientY };

      setTimeout(() => {}, 1000);

      // 前回の位置が存在し、かつ移動距離が10px未満の場合は無視
      if (lastMousePosition.current) {
        const dx = currentMousePosition.x - lastMousePosition.current.x;
        const dy = currentMousePosition.y - lastMousePosition.current.y;
        if (Math.sqrt(dx * dx + dy * dy) < 10) {
          return;
        }
      }

      lastMousePosition.current = currentMousePosition;

      const img: SvgImage = {
        src: "",
        left: event.clientX,
        top: event.clientY,
        id: Date.now(),
      };
      setSvgImages((prev) => [...prev, img]);
    };

    // マウント時：マウスイベントリスナを追加
    window.addEventListener("mousemove", mouseMoveListener);

    // アンマウント時：マウスイベントリスナを削除
    return () => {
      window.removeEventListener("mousemove", mouseMoveListener);
    };
  }, []);

  return (
    <>
      {svgImages.map((img) => (
        <Star key={img.id} name="pointer" position={{ x: img.left, y: img.top }} />
      ))}
    </>
  );
};

export default Pointer;
