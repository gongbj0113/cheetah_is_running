import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "치타는 달린다 - Cheetah Runs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2263201396084913" />
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-2263201396084913"
        ></meta>
        <meta
          name="google-site-verification"
          content="diuT1HBEkMxYhKIdVUf9KI8syTlI1QY8vyI-HBwk1-0"
        />
        <meta
          name="description"
          content="치타는 웃고 있다는 말을 들어보셨나요? 아니, 이제는 치타도 달려야 할 때가 왔습니다. 치타는 달린다 짤을 만들어보세요! - 치타는 달린다 움짤, gif, 비디오 만들기. 인스타 스토리에 올려보세요"
        />
        <meta name="og:site_name" content="치타는 달린다 - Cheetah Runs" />
        <meta name="og:title" content="치타는 달린다 - Cheetah Runs" />
        <meta
          name="og:description"
          content="치타는 웃고 있다는 말을 들어보셨나요? 아니, 이제는 치타도 달려야 할 때가 왔습니다. 치타는 달린다 짤을 만들어보세요!"
        />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://cheetahisrunning.site" />
        <meta name="og:image" content="/thumbnail.png" />
        <meta name="og:thumbnail" content="/thumbnail.png" />
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
