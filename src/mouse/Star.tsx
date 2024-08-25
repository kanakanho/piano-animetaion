import React from "react";
import styled from "styled-components";
import star from "/SVG/star.svg";

type Props = {
  name: string;
  position: { x: number; y: number };
};

const getRandomSize = () => Math.floor(Math.random() * 20) + 20; // 20pxから50pxのランダムなサイズ
const getRandomRotation = () => Math.floor(Math.random() * 90); // 0度から360度のランダムな回転

const StarContainer = styled.div<{ x: number; y: number; size: number; rotation: number }>`
  z-index: calc(infinity);
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: fixed;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  transform: rotate(${({ rotation }) => rotation}deg);
  opacity: 1;

  /* 1秒後に透明度を0にする */
  animation: fadeOut 0.5s forwards 0.5s;

  @keyframes fadeOut {
    to {
      opacity: 0;
    }
  }
`;

const Star: React.FC<Props> = ({ name, position }) => {
  const size = getRandomSize();
  const rotation = getRandomRotation();

  return (
    <StarContainer className={name} x={position.x} y={position.y} size={size} rotation={rotation}>
      <img src={star} alt="pointer" style={{ width: "100%", height: "100%" }} />
    </StarContainer>
  );
};

export default Star;
