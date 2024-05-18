import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import ReduxProvider from "./components/ReduxProvider";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Amazon Clone",
  description: "Amazone Clone for shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <div className="overflow-hidden">
          <ReduxProvider>
              <Header />
              {children}
              <Footer />
          </ReduxProvider>
          <ToastContainer />
          </div>
        </body>
    </html>
  );
}
