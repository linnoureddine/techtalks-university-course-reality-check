import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
<<<<<<< HEAD
=======
import { ToastProvider } from "@/components/toast/Toastprovider";
>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a

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
<<<<<<< HEAD
        <NavBar />

        <main className="flex-grow w-full">{children}</main>

        <Footer />
=======
        <ToastProvider>
          <main className="flex-grow w-full">{children}</main>
        </ToastProvider>
>>>>>>> d7521b97bc811563e52ba027d57abf2af19f818a
      </body>
    </html>
  );
}
