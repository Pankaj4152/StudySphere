import { Header } from "@/components/scholarsphere/header";
import { Hero } from "@/components/scholarsphere/hero";
import { Resources } from "@/components/scholarsphere/resources";
import { Syllabus } from "@/components/scholarsphere/syllabus";
import { Contact } from "@/components/scholarsphere/contact";
import { Footer } from "@/components/scholarsphere/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Resources />
        <Syllabus />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
