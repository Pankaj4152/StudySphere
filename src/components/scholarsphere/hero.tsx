"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Balancer } from "react-wrap-balancer";

export function Hero() {
  return (
    <section id="home" className="w-full py-20 md:py-32 lg:py-40 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              <Balancer>College Study Resource Hub</Balancer>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              <Balancer>
                Access Past Year Questions (PYQs), notes, and PDFs for all branches and semesters. Your one-stop destination for academic success.
              </Balancer>
            </p>
          </div>
          <div className="w-full max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for subjects, topics, or resources..."
                className="w-full rounded-full bg-background py-6 pl-12 pr-4 text-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
