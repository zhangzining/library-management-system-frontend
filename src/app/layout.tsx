import type {Metadata, Viewport} from "next";
import localFont from "next/font/local";
import {ReactNode} from "react";
import "./globals.css";
import StoreProvider from "@/app/StoreProvider";
import ErrorNotification from "@/app/ui/error-notification";
import ToastNotification from "@/app/ui/toast-notification";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "掌上借阅",
  description: "随时随地管理您的借阅"
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-screen w-screen `}
      >
        <StoreProvider>
          {children}
          <ErrorNotification/>
          <ToastNotification/>
        </StoreProvider>
      </body>
    </html>
  );
}
