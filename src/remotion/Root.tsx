import React from "react";
import { Composition } from "remotion";
import Start from "./comps/Start";
import StartLoop from "./comps/StartLoop";
import End from "./comps/End";
import EndLoop from "./comps/EndLoop";
import Tickets from "./comps/Tickets";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Start"
        component={Start}
        durationInFrames={121}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="StartLoop"
        component={StartLoop}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="End"
        component={End}
        durationInFrames={85}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="EndLoop"
        component={EndLoop}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Tickets"
        component={Tickets}
        durationInFrames={85}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
