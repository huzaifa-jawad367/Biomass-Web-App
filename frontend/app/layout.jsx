// import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "../components/footer";
import { Toaster } from "../components/ui/sonner";
import HeaderAuth from "../components/headerAuth";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AI ForCaST",
  description:
    "AI ForCaST is a web application that allows users to visualize and analyze forest biomass data using augmented reality technology.",
};

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <HeaderAuth />
        <main className="min-h-screen"> 
          {/*  flex flex-col items-center justify-center */}
          {children}
        </main>
        <Footer />
        <Toaster className="flex min-h-screen" />
      </body>
    </html>
  );
}
