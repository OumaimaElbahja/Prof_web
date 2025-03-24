import { CreateAssignmentButton } from "./components/assignments-create-button";
import { AssignmentsFilter } from "./components/assignments-filter";
import { AssignmentsStats } from "./components/assignments-stats";
import { AssignmentsTable } from "./components/assignments-table";

export default function AssignmentsPage() {
  return (
    <main className="flex-1 p-6 lg:p-8 bg-muted/30">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
            <p className="text-muted-foreground">
              Create and manage assignments for your courses
            </p>
          </div>
          <CreateAssignmentButton />
        </div>

        <AssignmentsStats />
        <AssignmentsFilter />
        <AssignmentsTable />
      </div>
    </main>
  );
}
