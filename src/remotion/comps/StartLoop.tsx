import { AbsoluteFill, staticFile, Video } from "remotion";

function StartLoop() {
  return (
    <>
      <AbsoluteFill>
        <Video src={staticFile("animation/startLoop.mp4")} />
      </AbsoluteFill>
    </>
  );
}

export default StartLoop;
