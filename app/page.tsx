import { Hero }         from "@/components/sections/Hero";
import { Stats }        from "@/components/sections/Stats";
import { About }        from "@/components/sections/About";
import { Projects }     from "@/components/sections/Projects";
import { Research }     from "@/components/sections/Research";
import { Services }     from "@/components/sections/Services";
import { Contact }      from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Projects />
      <Research />
      <Services />
      <Contact />
    </>
  );
}
