import { AbsoluteFill, staticFile, Video } from "remotion";

function EndLoop() {
  return (
    <>
      <AbsoluteFill>
        <Video src={staticFile("animation/endLoop.mp4")} />
      </AbsoluteFill>
    </>
  );
}

export default EndLoop;
