import { Signal, signal } from "@preact/signals-react";
import { AnimationItem } from "lottie-web";

export type PPAnimationItem = {
  markers: { duration: number; payload: { name: string }; time: number }[];
  assets: {
    "id": string;
    "w": number;
    "h": number;
    "u": string;
    "p": string;
    "e": number;
  }[];
  animationData: any;
  wrapper: HTMLDivElement;
} & AnimationItem;

export interface LineProfile {
  userId: string;
  displayName: string;
  pictureUrl?: URL;
  statusMessage?: string;
}

export const blowEnabledSignal: Signal<boolean> = signal(false);

export const blowOutSignal: Signal<boolean> = signal(false);

export const userIdSignal: Signal<string> = signal("");

export function injectUserProfile(
  animationData: any,
  pictureUrl: URL,
  username: string,
) {
  console.log(`Injecting: ${pictureUrl.toString() + "  |  " + username}`);
  // Picture
  animationData.assets[0].u = pictureUrl.toString();
  animationData.assets[0].p = "";
  // Username
  animationData.assets[2].layers[4].t.d.k[0].s.t = username;
  // Coupon
  animationData.assets[1].layers[2].t.d.k[0].s.t = getCoupon();

  console.log(`Profile injected`);
  return animationData;
}

export function generateUniqueId() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const idLength = 7;
  let uniqueId = "";

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueId += characters.charAt(randomIndex);
  }

  return uniqueId;
}

export function playAnimationAsync(
  animation: PPAnimationItem | AnimationItem,
  marker: string,
) {
  return new Promise<void>((resolve) => {
    animation.goToAndPlay(marker);
    const handler = () => {
      resolve();
    };
    animation.addEventListener("complete", handler);
  });
}

function getCoupon() {
  if (!localStorage.getItem("pp-birthday-coupon")) {
    const newCoupon = generateUniqueId();
    localStorage.setItem("pp-birthday-coupon", newCoupon);
    return newCoupon;
  } else {
    return localStorage.getItem("pp-birthday-coupon")!;
  }
}

// export async function sendCouponToUser() {
//   const resp = await fetch(
//     "https://pp-line-server.deno.dev/message/push",
//     {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userId: userIdSignal.peek(),
//         messages: [
//           {
//             type: "text",
//             text: getCoupon(),
//           },
//           {
//             type: "text",
//             text: "👆🏼👆🏼以上是您的專屬折扣碼，寓寓動畫祝您生日快樂！🎂🎉🎊",
//           },
//         ],
//       }),
//     },
//   );
//   return resp;
// }
