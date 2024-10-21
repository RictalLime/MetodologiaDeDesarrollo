import "@/styles/globals.css";
import { Roboto } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';


const roboto = Roboto({
  weight: ['400', '700'], // Especifica los pesos de la fuente
  subsets: ['latin'], // Subconjunto de la fuente
});
const playfair = Playfair_Display({
  weight: ['400', '900'], // Especifica los pesos de la fuente
  subsets: ['latin'], // Subconjunto de la fuente
});

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

