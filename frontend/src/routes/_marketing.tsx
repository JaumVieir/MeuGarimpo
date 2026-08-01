import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageShell } from "@/components/marketing/PageShell";

export const Route = createFileRoute("/_marketing")({
  component: () => (
    <PageShell>
      <Outlet />
    </PageShell>
  ),
});
