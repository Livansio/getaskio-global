import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Askio | Интеллектуальный транзитный шлюз для IT-требований",
  description: "Остановите хаос в коде. Семантический брандмауэр между бизнесом и разработкой. Автоматизация процессов и IT-аутсорсинг.",
  keywords: "IT аутсорсинг, автоматизация бизнеса, управление требованиями, разработка, Askio",
  openGraph: {
    title: "Askio | Автоматизация бизнеса",
    description: "Семантический брандмауэр между бизнесом и разработкой.",
    url: "https://www.getaskio.com",
    siteName: "Askio",
    locale: "ru_KZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-YRK8817VLP`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YRK8817VLP', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Yandex Metrica */}
        <Script
          id="yandex-metrica"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=107054693", "ym");

              ym(107054693, "init", {
                   clickmap:true,
                   trackLinks:true,
                   accurateTrackBounce:true,
                   webvisor:true
              });
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}