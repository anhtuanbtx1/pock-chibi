import type { Metadata } from "next";
import { Kanit, PT_Sans } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-kanit",
  display: "swap",
});

const ptSans = PT_Sans({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-pt-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pock Chibi - Thu Vien The Chibi Tien Canh 3D",
  description: "Kham pha bo suu tap the bai Chibi Tien Canh, Than Thoai & Vo Lam 3D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${kanit.variable} ${ptSans.variable}`}>
      <body className="antialiased overflow-x-hidden font-body bg-[#0a0c14]">
        {children}
      </body>
    </html>
  );
}
