import { Lottie, LottieAnimationData } from "@remotion/lottie";
import {
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
} from "remotion";
import {  useEffect, useState } from "react";

function Tickets() {
  const [handle] = useState(() => delayRender("Loading Lottie animation"));

  const [animationData, setAnimationData] = useState<
    LottieAnimationData | null
  >(null);

  useEffect(() => {
    fetch(staticFile("animation/tickets.json"))
      .then((data) => data.json())
      .then((json) => {
        setAnimationData(json);
        continueRender(handle);
      })
      .catch((err) => {
        cancelRender(err);
      });
  }, [handle]);

  if (!animationData) {
    return null;
  }

  return <Lottie animationData={animationData} />;
}

export default Tickets;
