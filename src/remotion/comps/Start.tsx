import { AbsoluteFill, staticFile, Video } from "remotion";

function Start() {
  return (
    <>
      <AbsoluteFill>
        <Video src={staticFile("animation/start.mp4")} />
      </AbsoluteFill>
    </>
  );
}

export default Start;
