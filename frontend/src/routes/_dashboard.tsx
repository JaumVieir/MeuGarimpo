import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/_dashboard")({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});
