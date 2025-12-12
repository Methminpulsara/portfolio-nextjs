import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/hooks/SmoothScrollProvider";

;

export const metadata: Metadata = {
  title: "Methmin | FullStackDeveloper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
