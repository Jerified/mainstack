import localFont from "next/font/local";

const degular = localFont({
  src: [
    {
      path: "../../../public/fonts/degular/DegularDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/degular/DegularDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/degular/DegularDisplay-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/degular/DegularDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});
export { degular };
