import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Blueprint } from "@/components/Blueprint";
import { Writing } from "@/components/Writing";
import { BuildSection } from "@/components/Build";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Blueprint />
        <Writing />
        <BuildSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
