import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-6">{children}</main>

        {/* Toast */}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}