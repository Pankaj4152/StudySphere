
"use client";

import { useState } from "react";
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
import { EditResourceDialog } from "./edit-resource-dialog";
import { DeleteResourceAlert } from "./delete-resource-alert";

export function ResourceTable({ resources }: { resources: Resource[] }) {
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [deletingResourceId, setDeletingResourceId] = useState<string | null>(null);

  return (
    <>
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
                  <Button variant="ghost" size="icon" onClick={() => setEditingResource(resource)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeletingResourceId(resource.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingResource && (
        <EditResourceDialog
          resource={editingResource}
          open={!!editingResource}
          onOpenChange={(isOpen) => !isOpen && setEditingResource(null)}
        />
      )}
      
      {deletingResourceId && (
        <DeleteResourceAlert
          resourceId={deletingResourceId}
          open={!!deletingResourceId}
          onOpenChange={(isOpen) => !isOpen && setDeletingResourceId(null)}
        />
      )}
    </>
  );
}
