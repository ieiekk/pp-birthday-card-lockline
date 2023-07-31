import { Signal, useSignal, useSignalEffect } from "@preact/signals-react";
import { Player } from "@lottiefiles/react-lottie-player";
import { AnimationItem } from "lottie-web";

interface Props {
  isLoadedSignal: Signal<boolean>;
}

function Loading({ isLoadedSignal }: Props) {
  const lottieSignal: Signal<AnimationItem | null> = useSignal(null);

  useSignalEffect(() => {
    lottieSignal.value?.setSubframe(false);
  });

  return (
    <>
      <img
        src="/images/pure-bg.jpg"
        className="fixed z-30 w-screen h-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Player
        id="loading"
        src="/animation/loading.json"
        autoplay
        loop
        className="fixed z-30 w-screen h-screen max-w-lg left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        lottieRef={(ref) => {
          lottieSignal.value = ref;
        }}
        onEvent={(event) => {
          if (event === "play") {
            isLoadedSignal.value = true;
          }
        }}
      />
    </>
  );
}

export default Loading;
