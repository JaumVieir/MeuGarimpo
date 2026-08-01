import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/features/dashboard/components/AppShell";

export const Route = createFileRoute("/_dashboard")({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});
