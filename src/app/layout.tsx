import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "치타는 달린다 - Cheetah Runs",
  description: "치타는 달린다 짤 생성기",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2263201396084913" />
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-2263201396084913"
        ></meta>
      </head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-NBWE2JHMG6" />
      <Script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', 'G-NBWE2JHMG6');
          `}
      </Script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
