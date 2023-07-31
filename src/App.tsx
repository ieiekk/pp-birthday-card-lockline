import "./App.css";
import { useMount } from "react-use";
import {
  blowEnabledSignal,
  blowOutSignal,
  injectUserProfile,
  PPAnimationItem,
  userIdSignal,
} from "@utils";
import { useSignal, useSignalEffect } from "@preact/signals-react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRef, useState } from "react";
import Loading from "./components/Loading";
import liff from "@line/liff/core";
import GetProfile from "@line/liff/get-profile";
import IsInClient from "@line/liff/is-in-client";
import CloseWindow from "@line/liff/close-window";
import ticketsAnimation from "./assets/tickets.json";
import { AnimationItem } from "lottie-web";

function App() {
  const occluderRef = useRef<HTMLImageElement>(null);
  const startRef = useRef<HTMLVideoElement>(null);
  const startLoopRef = useRef<HTMLVideoElement>(null);
  const endRef = useRef<HTMLVideoElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);
  // const ticketsRef = useSignal<PPAnimationItem | null>(null);
  const [ticketsInstance, setTicketsInstance] = useState<AnimationItem | null>(
    null,
  );
  const headInstanceSignal = useSignal<PPAnimationItem | null>(null);
  const endLoopRef = useRef<HTMLVideoElement>(null);
  const isLoadingLoadedSignal = useSignal(false);
  const readySignal = useSignal(0);
  const [animationData, setAnimationData] = useState(ticketsAnimation);
  const [isTicketsMutated, setIsTicketsMutated] = useState(false);
  const tapInstance = useSignal<PPAnimationItem | null>(null);

  const fixedClass: string =
    "max-w-lg left-0 right-0 top-0 bottom-0 m-auto z-10 fixed w-screen h-screen";

  useMount(() => {
    addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  });

  useMount(() => {
    liff.use(new IsInClient());
    liff.use(new GetProfile());
    liff.use(new CloseWindow());
    if (location.hostname === "localhost") {
      readySignal.value += 1;
      setIsTicketsMutated(true);
      return;
    }
    liff
      .init({
        liffId: "2000272909-4ZXxAvra",
        withLoginOnExternalBrowser: true,
      })
      .then(() => {
        liff
          .getProfile()
          .then((profile) => {
            userIdSignal.value = profile.userId;
            const newAnimationData = injectUserProfile(
              animationData,
              profile.pictureUrl as unknown as URL,
              profile.displayName,
            );
            setAnimationData(newAnimationData);
            setIsTicketsMutated(true);
            readySignal.value += 1;
          })
          .catch((error) => console.error(`Profile error: ${error}`));
      })
      .catch((err) => {
        // Error happens during initialization
        console.log(err.code, err.message);
      });
  });

  useSignalEffect(() => {
    if (readySignal.value > 0 && readySignal.value < 6) {
      console.log(readySignal.peek());
    }
    if (readySignal.value === 5) {
      setTimeout(() => {
        startRef.current?.play();
        readySignal.value += 1;
      }, 1000);
    }
  });

  useSignalEffect(() => {
    if (blowOutSignal.value) {
      console.log("blew out");
      blowEnabledSignal.value = false;

      if (!musicRef.current) return;
      const audio = musicRef.current;
      audio.muted = false;
      audio.play();

      if (startRef.current) startRef.current.remove();
      startLoopRef.current?.remove();
      endRef.current?.play();

      headInstanceSignal.value?.goToAndPlay("end");
      headInstanceSignal.value?.setLoop(false);

      ticketsInstance?.goToAndPlay(0, true);
    }
  });

  useSignalEffect(() => {
    if (blowEnabledSignal.value && tapInstance.peek()) {
      const tap = tapInstance.peek()!;
      document.getElementById("range")?.addEventListener(
        "click",
        () => {
          console.log("dot clicked");
          blowOutSignal.value = true;
          tap.wrapper.style.opacity = "0";
        },
        {
          once: true,
        },
      );
      tap.wrapper.addEventListener("transitionend", () => {
        if (blowOutSignal.peek()) {
          console.log("destroy tap");
          tap.wrapper.remove();
        }
      });
      tap.wrapper.classList.remove("opacity-0");
      tap.play();
    }
  });

  return (
    <>
      <div className="touch-none select-none">
        <div ref={occluderRef}>
          <Loading isLoadedSignal={isLoadingLoadedSignal} />
        </div>

        {isLoadingLoadedSignal.value &&
          (
            <main>
              <audio
                ref={musicRef}
                src="/music.mp3"
              />

              <video
                ref={endLoopRef}
                onCanPlayThrough={() => {
                  if (readySignal.value > 5) return;
                  console.log("can play through endLoop");
                  readySignal.value += 1;
                }}
                src="/animation/endLoop.mp4#t=0.04"
                className={`${fixedClass}`}
                muted={true}
                loop={true}
                playsInline={true}
              >
              </video>

              <video
                ref={endRef}
                onCanPlayThrough={() => {
                  if (readySignal.value > 5) return;
                  console.log("can play through end");
                  readySignal.value += 1;
                }}
                src=" /animation/end.mp4#t=0.04"
                className={`${fixedClass}`}
                muted={true}
                onEnded={(e) => {
                  if (!endLoopRef.current) return;
                  endLoopRef.current.play();
                  e.currentTarget.remove();
                }}
                playsInline={true}
              >
              </video>

              <video
                ref={startLoopRef}
                onCanPlayThrough={() => {
                  if (readySignal.value > 5) return;
                  console.log("can play through startLoop");
                  readySignal.value += 1;
                }}
                src="/animation/startLoop.mp4#t=0.04"
                className={`${fixedClass} transition-all`}
                onEnded={() => {
                  if (!startLoopRef.current) return;
                  startLoopRef.current.play();
                  startLoopRef.current.loop = true;
                }}
                muted={true}
                playsInline={true}
              >
              </video>

              <video
                ref={startRef}
                onPlay={() => {
                  occluderRef.current?.remove();
                }}
                onCanPlayThrough={() => {
                  if (readySignal.value > 5) return;

                  console.log("can play through start");
                  readySignal.value += 1;
                }}
                onEnded={(e) => {
                  if (!startLoopRef.current) return;
                  startLoopRef.current.play();
                  console.log("start ended");
                  e.currentTarget.remove();
                }}
                onTimeUpdate={(e) => {
                  if (
                    e.currentTarget.currentTime > 2 && !blowEnabledSignal.value
                  ) {
                    blowEnabledSignal.value = true;
                  }
                }}
                className={fixedClass}
                muted={true}
                width={1080}
                height={1920}
                src="/animation/start.mp4#t=0.04"
                playsInline={true}
              >
              </video>

              <Player
                id="tap"
                src="/animation/tap.json"
                className={`${fixedClass} z-20 opacity-0 transition-opacity duration-500`}
                lottieRef={(instance) => {
                  tapInstance.value = instance as PPAnimationItem;
                }}
                loop
              />

              {isTicketsMutated &&
                (
                  <Player
                    src={animationData}
                    className={`${fixedClass} ${
                      blowOutSignal.value ? "" : "opacity-0"
                    }`}
                    autoplay
                    lottieRef={(instance) => {
                      setTicketsInstance(instance);
                      instance.setSubframe(false);
                      console.log(instance);
                    }}
                    keepLastFrame={true}
                  />
                )}
            </main>
          )}
      </div>
    </>
  );
}


export default App;
