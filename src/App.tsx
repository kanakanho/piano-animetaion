import blue from "/SVG/blue.svg";
import { useEffect, useState } from "react";
import "./App.css";
import { SvgImage } from "./type/SvgImage";
import Pointer from "./mouse/Pointer";
import styled from "styled-components";

const ImgPoint = styled.img<{ size: number; top: number; left: number }>`
  z-index: calc(infinity);
  position: fixed;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  opacity: 1;

  /* 1秒後に透明度を0にする */
  animation: fadeOut 0.5s forwards 0.5s;

  @keyframes fadeOut {
    to {
      opacity: 0;
    }
  }
`;

function App() {
  const [isActive, setIsActive] = useState(false);
  const [svgImage, setSvgImage] = useState<SvgImage>({
    src: "",
    left: 0,
    top: 0,
    id: 0,
  });

  const size = 100;
  const sizeOffset = size / 2;

  useEffect(() => {
    // 1秒たったら消す
    if (isActive) {
      setTimeout(() => {
        setIsActive(false);
      }, 800);
    }
  }, [isActive]);

  useEffect(() => {
    const mouseClickListener = (event: MouseEvent) => {
      const img: SvgImage = {
        src: blue,
        left: event.clientX - sizeOffset,
        top: event.clientY - sizeOffset,
        id: Date.now(),
      };
      setSvgImage(img);
      setIsActive(true);
    };

    // マウント時：マウスイベントリスナを追加
    window.addEventListener("click", mouseClickListener);

    // アンマウント時：マウスイベントリスナを削除
    return () => {
      window.removeEventListener("click", mouseClickListener);
      setIsActive(false);
    };
  }, [sizeOffset]);

  return (
    <div className="App">
      {isActive ? <ImgPoint src={svgImage.src} size={size} top={svgImage.top} left={svgImage.left} /> : null}
      <Pointer />
    </div>
  );
}

export default App;
