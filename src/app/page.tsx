import { Header } from "@/components/scholarsphere/header";
import { Hero } from "@/components/scholarsphere/hero";
import { Resources } from "@/components/scholarsphere/resources";
import { Syllabus } from "@/components/scholarsphere/syllabus";
import { Contact } from "@/components/scholarsphere/contact";
import { Footer } from "@/components/scholarsphere/footer";
import { getResources } from "@/services/firestore";
import { getSyllabus } from "@/services/firestore";

export default async function Home() {
  const [resources, syllabus] = await Promise.all([
    getResources(),
    getSyllabus(),
  ]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Resources resources={resources} />
        <Syllabus syllabus={syllabus} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
