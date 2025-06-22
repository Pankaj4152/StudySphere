"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSyllabus, branches, Syllabus as SyllabusType } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { SummarizeDialog } from "./summarize-dialog";

function SyllabusTable({ syllabus }: { syllabus: SyllabusType[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Semester</TableHead>
          <TableHead>Subjects</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {syllabus.map((item) => (
          <TableRow key={`${item.branch}-${item.semester}`}>
            <TableCell className="font-medium">{item.semester}</TableCell>
            <TableCell>
                <div className="flex flex-wrap gap-2">
                    {item.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary" className="font-normal">{subject}</Badge>
                    ))}
                </div>
            </TableCell>
            <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download Syllabus PDF</span>
                </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function Syllabus() {
  return (
    <section id="syllabus" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              Syllabus Overview
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse the official syllabus for each branch and semester.
            </p>
          </div>
          <SummarizeDialog />
        </div>

        <Tabs defaultValue={branches[0]} className="w-full mt-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
                {branches.map((branch) => (
                    <TabsTrigger key={branch} value={branch}>
                    {branch}
                    </TabsTrigger>
                ))}
            </TabsList>
          </div>
          {branches.map((branch) => (
            <TabsContent key={branch} value={branch} className="mt-6">
              <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
                 <SyllabusTable syllabus={mockSyllabus.filter(s => s.branch === branch)} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
