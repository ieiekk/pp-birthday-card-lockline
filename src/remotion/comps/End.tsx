import { AbsoluteFill, staticFile, Video } from "remotion";

function End() {
  return (
    <>
      <AbsoluteFill>
        <Video src={staticFile("animation/end.mp4")} />
      </AbsoluteFill>
    </>
  );
}

export default End;
