import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/hooks/SmoothScrollProvider";

;

export const metadata: Metadata = {
  title: {
    default: "Methmin Pulsara | Full-Stack Developer",
    template: "%s | Methmin Pulsara",
  },
  verification: {
    google: "2JKrfWhlbAaMo956FOxMllHzhhUjqEM4yfIU7VGKHpo", 
  },
  description: "Official portfolio of Methmin Pulsara, a passionate Full-Stack Developer specializing in modern web technologies and high-performance applications.",
  keywords: ["Methmin Pulsara", "Methmith Pulara","Methmin","Pulsara", ,"Software Engineer", "Full Stack Developer", "Software Engineer Sri Lanka", "Next.js Portfolio"],
  authors: [{ name: "Methmin Pulsara" }],
  creator: "Methmin Pulsara",
  
  metadataBase: new URL("https://portfolio-methminpulsara.vercel.app"),

  openGraph: {
    title: "Methmin Pulsara | Full-Stack Developer Portfolio",
    description: "Check out my latest projects and skills in modern web development.",
    url: "https://portfolio-methminpulsara.vercel.app",
    siteName: "Methmin Pulsara",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Methmin Pulsara Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Methmin Pulsara | Full-Stack Developer",
    description: "Passionate Full-Stack Developer specializing in React, Next.js, and Node.js.",
    creator: "@your_twitter_handle", 
    images: ["/og-image.png"], 
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
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
