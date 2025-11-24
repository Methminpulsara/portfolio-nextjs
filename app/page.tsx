import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HorizontalScroll from "@/components/HorizontalScroll";
import Layout from "@/components/Layput";
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import VerticalSection from "@/components/VerticalSection";


export default function Home() {
  return (
 
     <Layout>
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <VerticalSection />
      </div>
      <HorizontalScroll />
      <Skills />
      <Contact />
      <Footer />
    </Layout>
  )
}
