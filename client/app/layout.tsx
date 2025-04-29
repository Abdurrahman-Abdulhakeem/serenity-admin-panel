import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Providers from "./providers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Serenity Admin",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
         <Providers>
         <ToastContainer hideProgressBar />
        {children}
         </Providers>
      </body>
    </html>
  );
}
