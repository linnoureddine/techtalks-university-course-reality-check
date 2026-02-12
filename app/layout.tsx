import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { ToastProvider } from "@/components/toast/Toastprovider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coursality",
  description: "University course reviews and insights",
  icons: {
    icon: "../favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col p-0 m-0`}
      >
        <ToastProvider>
          <main className="flex-grow w-full">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
