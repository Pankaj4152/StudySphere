
import { getResources } from "@/services/firestore";
import { Header } from "@/components/scholarsphere/header";
import { AddResourceDialog } from "./add-resource-dialog";
import { ResourceTable } from "./resource-table";
import { LogoutButton } from "./logout-button";

export default async function AdminPage() {
  const resources = await getResources();

  return (
    <>
      <Header />
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your educational resources.</p>
            </div>
          <div className="flex items-center gap-4">
            <AddResourceDialog />
            <LogoutButton />
          </div>
        </div>
        <h2 className="text-2xl font-bold font-headline">Manage Resources</h2>
        {resources.length > 0 ? (
          <ResourceTable resources={resources} />
        ) : (
          <div className="text-center py-16 border rounded-md mt-6">
            <p className="text-xl text-muted-foreground">No resources found.</p>
            <p className="text-muted-foreground">Add a new resource to get started.</p>
          </div>
        )}
      </div>
    </>
  );
}
