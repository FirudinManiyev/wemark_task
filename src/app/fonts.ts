import localFont from "next/font/local";

export const hoves = localFont({
  src: [
    { path: "../../fonts/fonts/TT HOVES/TT Hoves Regular.otf", weight: "400", style: "normal" },
    { path: "../../fonts/fonts/TT HOVES/TT Hoves Medium.otf", weight: "500", style: "normal" },
  ],
  variable: "--font-hoves",
  display: "swap",
});

export const firsNeue = localFont({
  src: [
    {
      path: "../../fonts/fonts/tt-firs-neue/TT Firs Neue Trial Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/fonts/tt-firs-neue/TT Firs Neue Trial Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-firs-neue",
  display: "swap",
});
