import { Roboto } from "next/font/google";
import { Playfair_Display } from "next/font/google";

export const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
  });
  
  export const playfair_Display = Playfair_Display({
    weight: [ "400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
  });