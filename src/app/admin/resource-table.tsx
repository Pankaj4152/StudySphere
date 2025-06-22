import type { Resource } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export function ResourceTable({ resources }: { resources: Resource[] }) {
  return (
    <div className="rounded-md border mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Sem</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium max-w-xs truncate">{resource.title}</TableCell>
              <TableCell>{resource.subject}</TableCell>
              <TableCell>{resource.branch}</TableCell>
              <TableCell>{resource.year}</TableCell>
              <TableCell>{resource.semester}</TableCell>
              <TableCell><Badge variant="secondary">{resource.type}</Badge></TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" disabled title="Edit (coming soon)">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" disabled title="Delete (coming soon)">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
