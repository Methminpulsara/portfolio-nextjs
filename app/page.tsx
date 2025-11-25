"use client"
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HorizontalScroll from "@/components/HorizontalScroll";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import About from "@/components/About";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useEffect, useState } from "react";
import Cursor from "@/components/Cursor";


export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Wait for window load
  useEffect(() => {
    const handleLoad = () => {
      setIsPageLoaded(true);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // Prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  return (
    <>
      <Cursor />
      {isLoading && (
        <LoadingOverlay 
          isPageLoaded={isPageLoaded} 
          onComplete={() => setIsLoading(false)} 
        />
      )}
      
      <Layout>
        <Navbar />
        
        <Hero />

        <About />

        <HorizontalScroll />
        
        <Skills />

        <Contact />
        <Footer/>
      </Layout>
    </>
  );
}

