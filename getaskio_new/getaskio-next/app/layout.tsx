import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Askio | Интеллектуальный транзитный шлюз для IT-требований",
  description: "Остановите хаос в коде. Семантический брандмауэр между бизнесом и разработкой. Автоматизация процессов и IT-аутсорсинг.",
  keywords: "IT аутсорсинг, автоматизация бизнеса, управление требованиями, разработка, Askio",
  openGraph: {
    title: "Askio | Автоматизация бизнеса",
    description: "Семантический брандмауэр между бизнесом и разработкой.",
    url: "https://getaskio.com",
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
      <body>{children}</body>
    </html>
  );
}