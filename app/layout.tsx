import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Crypto",
  description: "Generated by create next app",
  icons:{
    icon:"./fav.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Header />
        <div className="mt-20 min-h-[800px] mx-auto w-[80%]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
