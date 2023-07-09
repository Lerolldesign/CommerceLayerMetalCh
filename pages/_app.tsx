import React from "react";
import { AppProps } from "next/app";
import "../styles/main.css";
import "../styles/app.css";

import { Inter } from 'next/font/google';
import localFont from "next/font/local";
 
const sans = Inter({
  subsets: ['latin'],
  weight: ['200', '300','500','600', '700', '800'],
  display: 'swap',
  variable: '--font-sans',
});
 
const metalch = localFont({
  src:"../fonts/integralcf-bold.ttf",
  display: 'swap',
  variable: '--font-metalch',
});



function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
           <style jsx global>
    {`
      :root {
        --font-metalch: ${metalch.style.fontFamily};
        --font-sans: ${sans.style.fontFamily};
     
      }
    `}
  </style>
      <Component {...pageProps} />
   
    </>
  );
}

export default CustomApp;
